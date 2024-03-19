// server/routes/api/coingeckoService.js

const axios = require('axios');

const BASE_URL = 'https://pro-api.coingecko.com/api/v3';

async function getCryptoData() {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: 'bitcoin,ethereum,litecoin,ripple,cardano,solana,dogecoin,binancecoin', // Add more coins here
        // No need for API key in the headers for CoinGecko Pro API
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
