const express = require('express');
const router = express.Router();

// Import API routes
const openaiRoutes = require('./openai-routes');
const userRoutes = require('./user-routes');
const neuralNetworkPredictionRoutes = require('./neuralNetworkPredictionRoutes');

// Define middleware for API routes
router.use('/openai', openaiRoutes);
router.use('/user', userRoutes);
router.use('/neuralNetworkPrediction', neuralNetworkPredictionRoutes);

module.exports = router;
