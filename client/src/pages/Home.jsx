import LineChart from '../components/LineGraph2';
import LineGraphApexCharts from '../components/LineGraphApexCharts';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fetchCryptoData from '../components/fetchCryptoData';

function Home() {
  const coins = ['BTC', 'ETH']; // Array of cryptocurrencies
  const [cryptoData, setCryptoData] = useState({}); // State to store crypto data

  useEffect(() => {
    // Fetch crypto data for each coin when the component mounts
    const fetchDataForCoins = async () => {
      const data = {};
      for (const coin of coins) {
        const coinData = await fetchCryptoData(coin);
        data[coin] = coinData;
      }
      setCryptoData(data);
    };
    fetchDataForCoins();
  }, []);

  useEffect(() => {
    // Log crypto data when it's updated
    console.log(cryptoData);
  }, [cryptoData]);

  return (
    <div className="page">
      <h2>Home</h2>
      <p>Welcome to the Home page!</p>
      {coins.map((coin) => (
        cryptoData[coin] && <LineGraphApexCharts key={coin} stockName={coin} rawData={cryptoData[coin]} />
      ))}
    </div>
  );
}

export default Home;

