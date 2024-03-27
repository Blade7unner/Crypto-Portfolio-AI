import LineGraphApexCharts from '../components/LineGraphApexCharts';
import React, { useState, useEffect } from 'react';
import fetchCryptoData from '../components/fetchCryptoData';
import CryptoPrices from '../components/CryptoPrices';

function Home() {
  const coins = ['BTC','ETH','BNB','ADA','SOL','XRP','DOT','LTC','LINK','BCH','MV']
  const [cryptoData, setCryptoData] = useState({}); // State to store crypto data
  const [move, setMove] = useState({}); // State to store crypto data
  const [filter, setFilter] = useState('all'); // State to track the filter option

  useEffect(() => {
    // Fetch crypto data for each coin when the component mounts
    const fetchDataForCoins = async () => {
      const data = {};
      const moveData = {};
      for (const coin of coins) {
        const { restructuredData, move } = await fetchCryptoData(coin);
        data[coin] = restructuredData;
        moveData[coin] = { move };
      }
      setCryptoData(data);
      setMove(moveData);
    };
    fetchDataForCoins();
  }, []);

  useEffect(() => {
    // Log crypto data when it's updated
    console.log(cryptoData);
  }, [cryptoData]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="page">
      <CryptoPrices />
      <h2 className="text-2xl">Welcome to the Home page!</h2>
      <div>
        <label>
          Filter By:
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </label>
      </div>
      {coins.map((coin) => (
        (filter === 'all' || (filter === 'buy' && move[coin]?.move === 'Buy') || (filter === 'sell' && move[coin]?.move === 'Sell')) && cryptoData[coin] && (
          <LineGraphApexCharts
            key={coin}
            stockName={coin}
            rawData={cryptoData[coin]}
            move={move[coin]?.move}
          />
        )
      ))}
    </div>
  );
}

export default Home;