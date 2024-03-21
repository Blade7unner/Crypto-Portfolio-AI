const express = require('express');
const User = require('../../models/User');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

router.get('/favorites', authMiddleware, async (req, res) => {
  try {
    const userFavorites = req.user.favorites;
    res.status(200).json(userFavorites);
    console.log(userFavorites);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while fetching favorites.' });
  }
});

router.get('/favorites/:stockSymbol', authMiddleware, async (req, res) => {
  const { stockSymbol } = req.params;
  const isFavorite = req.user.favorites.includes(stockSymbol);
  res.status(200).send({ isFavorite });
});

router.post('/favorites', authMiddleware, async (req, res) => {
  try {
    if (!req.user.favorites.includes(req.body.stockSymbol)) {
      req.user.favorites.push(req.body.stockSymbol);
      await req.user.save();
      res.status(200).send(req.user);
    } else {
      res.status(400).send({ error: 'Stock symbol already in favorites.' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/favorites/:stockSymbol', authMiddleware, async (req, res) => {
  const { stockSymbol } = req.params;
  const index = req.user.favorites.indexOf(stockSymbol);
  if (index > -1) {
    req.user.favorites.splice(index, 1);
    await req.user.save();
    res.status(200).send(req.user);
  } else {
    res.status(400).send({ error: 'Stock symbol not found in favorites' });
  }
});

module.exports = router;
