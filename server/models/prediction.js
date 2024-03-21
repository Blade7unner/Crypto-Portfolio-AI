const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  stockName: { 
    type: String, 
    required: true 
  },
  predictions: [{ 
    type: Number 
  }]
});

const Prediction = mongoose.model('Prediction', predictionSchema);
module.exports = Prediction;
