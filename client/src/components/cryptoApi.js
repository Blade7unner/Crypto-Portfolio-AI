import axios from 'axios';

const fetchCryptoData = async (symbol) => {
    try {
      const response = await axios.get('https://min-api.cryptocompare.com/data/v2/histoday', {
        params: {
          fsym: symbol, // Symbol for the cryptocurrency (BTC or ETH)
          tsym: 'USD',  // Convert to USD
          limit: 1,    // Fetching data for the last 10 days
        },
      });
      return response.data.Data.Data; 
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
      return null; 
    }
  };
  
  export default fetchCryptoData;

  