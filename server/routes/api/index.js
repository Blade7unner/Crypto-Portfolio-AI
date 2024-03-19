// server/routes/api/index.js

const router = require('express').Router();
const openaiRoutes = require('./openai-routes.js');
const topGainersLosersService = require('./topGainersLosersService');
const simplePriceService = require('./simplePriceService'); // Import the simple price service

// Define route for fetching top gainers and losers data
router.get('/top-gainers-losers', async (req, res) => {
  try {
    const topGainersLosers = await topGainersLosersService.getTopGainersLosers();
    res.setHeader('Content-Type', 'application/json');
    res.json(topGainersLosers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define route for fetching simple price data
router.get('/simple-price', async (req, res) => {
  const { ids, vsCurrency } = req.query;
  try {
    const simplePrice = await simplePriceService.getSimplePrice(ids.split(','), vsCurrency);
    res.setHeader('Content-Type', 'application/json');
    res.json(simplePrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Include existing OpenAI routes
router.use('/openai', openaiRoutes);

module.exports = router;
