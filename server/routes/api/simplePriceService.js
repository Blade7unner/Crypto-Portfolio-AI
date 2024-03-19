// server/routes/api/simplePriceService.js

const axios = require('axios');

const BASE_URL = 'https://pro-api.coingecko.com/api/v3';

async function getSimplePrice(ids, vsCurrency) {
  try {
    const response = await axios.get(`${BASE_URL}/simple/price`, {
      params: {
        ids: ids.join(','),
        vs_currencies: vsCurrency,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching simple price data:', error.message);
    throw new Error('Failed to fetch simple price data');
  }
}

module.exports = {
  getSimplePrice,
};
