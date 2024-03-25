import React, { useState, useEffect } from 'react';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import fetchCryptoPrices from './cryptoPricesApi';

const CryptoPrices = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState('');
  const [ethereumPrice, setEthereumPrice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Bitcoin data
        const newCryptoData = await fetchCryptoPrices();
        setBitcoinPrice(newCryptoData.BTC.USD);
        setEthereumPrice(newCryptoData.ETH.USD);

      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };
    fetchData();
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
