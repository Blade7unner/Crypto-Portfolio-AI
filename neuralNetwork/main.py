import requests
import pandas as pd
import numpy as np
import datetime as dt
from sklearn.preprocessing import MinMaxScaler
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Check GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Device:", device)

# Load environment variables for MongoDB
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=dotenv_path)
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["cryptoDB"]
collection = db["neuralNetworkPredictions"]


# Function to fetch cryptocurrency data
def fetch_data(crypto_currency, against_currency, time_to):
    url = "https://min-api.cryptocompare.com/data/v2/histoday"
    params = {"fsym": crypto_currency, "tsym": against_currency,
              "limit": 2000, "toTs": time_to.timestamp()}
    response = requests.get(url, params=params)
    data = response.json()["Data"]["Data"]
    df = pd.DataFrame(data)
    df["time"] = pd.to_datetime(df["time"], unit="s")
    df.set_index("time", inplace=True)
    return df


# Function to insert prediction results into MongoDB
def insert_prediction_to_database(predictions, crypto_currency, against_currency):
    predictions_list = predictions.flatten().tolist()  # Convert tensor to list
    prediction_document = {
        "crypto_currency": crypto_currency,
        "against_currency": against_currency,
        "predictions": predictions_list,  # List of predicted prices for the next 10 days
        "prediction_date": dt.datetime.now(),
    }
    collection.insert_one(prediction_document)


# LSTM Model
class CryptoPredictor(nn.Module):
    def __init__(self, input_size=1, hidden_layer_size=50, output_size=10):
        super().__init__()
        self.hidden_layer_size = hidden_layer_size
        self.lstm = nn.LSTM(input_size, hidden_layer_size,
                            batch_first=True, num_layers=3, dropout=0.2)
        self.linear = nn.Linear(hidden_layer_size, output_size)
        self.dropout = nn.Dropout(0.2)

    def forward(self, input_seq):
        lstm_out, _ = self.lstm(input_seq)
        predictions = self.linear(self.dropout(lstm_out[:, -1]))
        return predictions


# clear out database
collection.delete_many({})

cryptocurrencies = ["BTC", "ETH", "BNB", "ADA",
                    "SOL", "XRP", "DOT", "LTC", "LINK", "BCH"]
against_currency = "USD"
prediction_days = 60
future_days = 10

for crypto_currency in cryptocurrencies:
    print(f"Processing {crypto_currency} predictions...")
    end = dt.datetime.now()
    data = fetch_data(crypto_currency, against_currency, end)

    # Data preprocessing
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data["close"].values.reshape(-1, 1))

    x_train, y_train = [], []
    for x in range(prediction_days, len(scaled_data) - future_days + 1):
        x_train.append(scaled_data[x - prediction_days: x, 0])
        y_train.append(scaled_data[x: x + future_days, 0])

    x_train, y_train = np.array(x_train), np.array(y_train)
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

    # Converting data to PyTorch tensors
    train_data = TensorDataset(torch.Tensor(x_train), torch.Tensor(y_train))
    train_loader = DataLoader(train_data, shuffle=False, batch_size=32)

    # Model setup
    model = CryptoPredictor().to(device)
    criterion = nn.MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

    # Training the model
    model.train()
    for epoch in range(25):
        for seq, labels in train_loader:
            optimizer.zero_grad()
            seq, labels = seq.to(device), labels.to(device)
            y_pred = model(seq)
            single_loss = criterion(y_pred, labels)
            single_loss.backward()
            optimizer.step()
        print(f"epoch: {epoch:3} loss: {single_loss.item():10.8f}")

    # Predicting the next 10 days
    model.eval()
    real_data = [
        scaled_data[len(scaled_data) - prediction_days: len(scaled_data), 0]]
    real_data = np.array(real_data)
    real_data = np.reshape(
        real_data, (real_data.shape[0], real_data.shape[1], 1))
    real_data = torch.Tensor(real_data).to(device)

    with torch.no_grad():
        future_predictions = model(real_data)

    # Scaling back the predictions to original scale
    future_predictions = scaler.inverse_transform(
        future_predictions.cpu().numpy())

    # Print each day's prediction
    for i, price in enumerate(future_predictions[0], start=1):
        print(f"Price of {crypto_currency} {
              i} day(s) from now is ${price:.2f}")

    # Insert predictions to MongoDB
    insert_prediction_to_database(
        future_predictions, crypto_currency, against_currency)

    print(f"Completed {crypto_currency} predictions.")

print("All predictions completed and saved to the database.")
