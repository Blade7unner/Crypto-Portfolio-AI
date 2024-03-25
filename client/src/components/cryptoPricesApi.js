import axios from 'axios';

const fetchCryptoPrices = async () => {
    try {
      const response = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD', {
        params: {
          fsym: 'BTC,ETH', // Symbol for the cryptocurrency
          tsym: 'USD',  // Convert to USD
        },
      });
      return response.data; 
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
      return null; 
    }
  };
  
  export default fetchCryptoPrices;

  