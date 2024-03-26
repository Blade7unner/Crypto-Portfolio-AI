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
    <div className="bg-white shadow-md rounded-lg p-6 mb-8"> {/* Card container with Tailwind styling */}
    <h2 className="text-lg font-semibold">Cryptocurrency Prices</h2>
    <div className="flex justify-start items-center gap-4 mt-4"> {/* Align items to the left and add some gap */}
      <div className="flex items-center">
        <FaBitcoin className="text-yellow-500" />
        <span className="ml-2">${bitcoinPrice}</span>
      </div>
      <div className="flex items-center">
        <FaEthereum className="text-blue-600" />
        <span className="ml-2">${ethereumPrice}</span>
      </div>
    </div>
  </div>
);
};


export default CryptoPrices;
