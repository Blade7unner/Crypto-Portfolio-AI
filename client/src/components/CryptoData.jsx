import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Separate component for displaying cryptocurrency data
const CryptoList = ({ cryptoData }) => (
  <div>
    <h2>Cryptocurrency Data</h2>
    <ul>
      {cryptoData.map((crypto) => (
        <li key={crypto.id}>
          {crypto.name} ({crypto.symbol}): ${crypto.current_price}
        </li>
      ))}
    </ul>
  </div>
);

// Separate component for displaying simple price data
const SimplePriceList = ({ simplePrice }) => (
  <div>
    <h2>Simple Price Data</h2>
    <ul>
      {Object.entries(simplePrice).map(([id, price]) => (
        <li key={id}>
          {id}: ${price.usd}
        </li>
      ))}
    </ul>
  </div>
);

const CryptoData = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [simplePrice, setSimplePrice] = useState(null); // State to store simple price data

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get('https://pro-api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          ids: 'bitcoin,ethereum',
          x_cg_pro_api_key: 'CG-nnCctk4hw5dDsH5iHEpiXfUu', // Your CoinGecko Pro API key
        },
      });
      setCryptoData(response.data);
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
    }
  };

  const fetchSimplePrice = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'bitcoin,ethereum,solana,dogecoin,binancecoin', // Add new coins here
          vs_currencies: 'usd',
        },
      });
      setSimplePrice(response.data);
    } catch (error) {
      console.error('Error fetching simple price data:', error);
    }
  };

  return (
    <div>
      <CryptoList cryptoData={cryptoData} />
      <button onClick={fetchSimplePrice}>Fetch Simple Price</button>
      {simplePrice && <SimplePriceList simplePrice={simplePrice} />}
    </div>
  );
};

export default CryptoData;
