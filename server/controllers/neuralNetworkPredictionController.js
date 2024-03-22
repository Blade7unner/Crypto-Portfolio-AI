const NeuralNetworkPrediction = require('../models/NeuralNetworkPrediction');

exports.getPredictions = async (req, res) => {
  try {
    const predictions = await NeuralNetworkPrediction.find({});
    res.json(predictions);
  } catch (err) {
    res.status(500).send({ message: `Error retrieving predictions: ${err.message}` });
  }
};
