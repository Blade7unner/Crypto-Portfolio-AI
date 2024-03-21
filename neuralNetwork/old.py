import requests
import pandas as pd
import numpy as np
import datetime as dt
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.layers import Dense, Dropout, LSTM
from tensorflow.keras.models import Sequential
import os
from pymongo import MongoClient
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path)
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["cryptoDB"]
collection = db["neuralNetwork"]


def insert_prediction_to_database(prediction, crypto_currency, against_currency):
    prediction_document = {
        "crypto_currency": crypto_currency,
        "against_currency": against_currency,
        "prediction": prediction.tolist(),
        "prediction_date": dt.datetime.now(),
    }
    collection.insert_one(prediction_document)


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


crypto_currency = "BTC"
against_currency = "USD"

start = dt.datetime(2016, 1, 1)
end = dt.datetime.now()

data = fetch_data(crypto_currency, against_currency, end)

# Preparing data
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(data["close"].values.reshape(-1, 1))

prediction_days = 60
future_day = 180

x_train, y_train = [], []

for x in range(prediction_days, len(scaled_data) - future_day):
    x_train.append(scaled_data[x - prediction_days: x, 0])
    y_train.append(scaled_data[x + future_day, 0])

x_train, y_train = np.array(x_train), np.array(y_train)
x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

model = Sequential()

model.add(LSTM(units=50, return_sequences=True,
          input_shape=(x_train.shape[1], 1)))
model.add(Dropout(0.2))
model.add(LSTM(units=50, return_sequences=True))
model.add(Dropout(0.2))
model.add(LSTM(units=50))
model.add(Dropout(0.2))
model.add(Dense(units=1))
model.compile(optimizer="adam", loss="mean_squared_error")
model.fit(x_train, y_train, epochs=25, batch_size=32)

test_data = fetch_data(crypto_currency, against_currency, end)
actual_prices = test_data["close"].values

total_dataset = pd.concat((data["close"], test_data["close"]), axis=0)
model_inputs = total_dataset[len(
    total_dataset) - len(test_data) - prediction_days:].values
model_inputs = model_inputs.reshape(-1, 1)
model_inputs = scaler.fit_transform(model_inputs)

x_test = []

for x in range(prediction_days, len(model_inputs)):
    x_test.append(model_inputs[x - prediction_days: x, 0])

x_test = np.array(x_test)
x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

prediction_prices = model.predict(x_test)
prediction_prices = scaler.inverse_transform(prediction_prices)

real_data = [model_inputs[len(model_inputs) + 1 -
                          prediction_days: len(model_inputs) + 1, 0]]

real_data = np.array(real_data)
real_data = np.reshape(real_data, (real_data.shape[0], real_data.shape[1], 1))

prediction = model.predict(real_data)
prediction = scaler.inverse_transform(prediction)
insert_prediction_to_database(prediction, crypto_currency, against_currency)
# print(prediction)
