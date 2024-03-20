// src/components/CryptoData.jsx
import React, { useState, useEffect } from 'react';
import Coins from './Coins';

const CryptoData = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en'
        );
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Top 10 Cryptocurrencies by Market Cap</h1>
      <Coins coins={coins} />
    </div>
  );
};

export default CryptoData;
