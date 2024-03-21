const express = require('express');
const router = express.Router();

// Import API routes
const openaiRoutes = require('./openai-routes');
const userRoutes = require('./user-routes');

// Define middleware for API routes
router.use('/openai', openaiRoutes);
router.use('/user', userRoutes);

module.exports = router;
