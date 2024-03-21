const express = require('express');
const router = express.Router();

// Import API routes
const openaiRoutes = require('./openai-routes');


// Define middleware for API routes
router.use('/openai', openaiRoutes);


module.exports = router;
