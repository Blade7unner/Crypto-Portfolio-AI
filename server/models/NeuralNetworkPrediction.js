const mongoose = require('mongoose');

const NeuralNetworkPredictionSchema = new mongoose.Schema({
    crypto_currency: {
        type: String,
        required: true,
    },
    against_currency: {
        type: String,
        required: true,
    },
    predictions: [Number],
    prediction_date: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('NeuralNetworkPrediction', NeuralNetworkPredictionSchema);
