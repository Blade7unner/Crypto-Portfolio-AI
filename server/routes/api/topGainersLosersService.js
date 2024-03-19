// server/routes/api/topGainersLosersService.js

const axios = require('axios');

const BASE_URL = 'https://pro-api.coingecko.com/api/v3';

async function getTopGainersLosers() {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top gainers and losers data:', error.message);
    throw new Error('Failed to fetch top gainers and losers data');
  }
}

module.exports = {
  getTopGainersLosers,
};
