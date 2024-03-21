import React, { useEffect } from 'react';
import fetchCryptoData from './cryptoApi'; 

const CryptoData = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Bitcoin data
        const btcData = await fetchCryptoData('BTC');
        console.log('Bitcoin Data:', btcData);
        
        // Fetch Ethereum data
        const ethData = await fetchCryptoData('ETH');
        console.log('Ethereum Data:', ethData);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };

    fetchData();
  }, []);

  return null; // Render nothing
};

export default CryptoData;
