// components/CryptoData.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoData = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        console.log(response.data)
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
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
};

export default CryptoData;
