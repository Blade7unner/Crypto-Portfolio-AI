
const axios = require('axios');

const BASE_URL = 'https://api.coingecko.com/api/v3';
const API_KEY = 'CG-ktjJjHNMEBGdNELv2xpJXjH3'; // CoinGecko API Key

async function getCryptoData() {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: 'bitcoin,ethereum',
      },
      headers: {
        // Include API key in request headers
        'x-access-token': API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error.message);
    throw new Error('Failed to fetch cryptocurrency data');
  }
}

module.exports = {
  getCryptoData,
};
