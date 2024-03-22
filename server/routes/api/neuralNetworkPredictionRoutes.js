const express = require('express');
const router = express.Router();
const { getPredictions } = require('../../controllers/neuralNetworkPredictionController');

// Use the getPredictions function for handling GET requests on this route
router.get('/', getPredictions);

module.exports = router;
