import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';

const CryptoPrices = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState('');
  const [ethereumPrice, setEthereumPrice] = useState('');

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              ids: 'bitcoin,ethereum',
            },
          }
        );
        const bitcoinData = response.data.find((crypto) => crypto.id === 'bitcoin');
        const ethereumData = response.data.find((crypto) => crypto.id === 'ethereum');

        if (bitcoinData) {
          setBitcoinPrice(bitcoinData.current_price);
        }
        if (ethereumData) {
          setEthereumPrice(ethereumData.current_price);
        }
      } catch (error) {
        console.error('Error fetching cryptocurrency prices:', error);
      }
    };

    fetchCryptoPrices();
  }, []);

  return (
    <div>
      <h2>Cryptocurrency Prices</h2>
      <div>
        <FaBitcoin />
        <span>Bitcoin Price: ${bitcoinPrice}</span>
      </div>
      <div>
        <FaEthereum />
        <span>Ethereum Price: ${ethereumPrice}</span>
      </div>
    </div>
  );
};

export default CryptoPrices;
