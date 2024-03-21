import React, { useState, useEffect } from 'react';
import fetchCryptoData from './cryptoApi'; // Import the fetchCryptoData function

const CryptoData = () => {
  const [btcData, setBtcData] = useState([]);
  const [ethData, setEthData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const btcData = await fetchCryptoData('BTC'); // Fetch Bitcoin data
      const ethData = await fetchCryptoData('ETH'); // Fetch Ethereum data

      if (btcData) {
        setBtcData(btcData); // Set Bitcoin data to state if fetched successfully
      }
      if (ethData) {
        setEthData(ethData); // Set Ethereum data to state if fetched successfully
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Render Bitcoin data */}
      <h2>Bitcoin Data</h2>
      <pre>{JSON.stringify(btcData, null, 2)}</pre>

      {/* Render Ethereum data */}
      <h2>Ethereum Data</h2>
      <pre>{JSON.stringify(ethData, null, 2)}</pre>
    </div>
  );
};

export default CryptoData;
