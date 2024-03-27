import React, { useState, useEffect } from 'react';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import {SiBinance, SiCardano, SiXrp, SiPolkadot, SiLitecoin, SiChainlink, SiBitcoincash} from 'react-icons/si';
import {TbCurrencySolana} from 'react-icons/tb';
import fetchCryptoPrices from './cryptoPricesApi';

const CryptoPrices = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState('');
  const [ethereumPrice, setEthereumPrice] = useState('');
  const [binancePrice, setBinancePrice] = useState('');
  const [cardanoPrice, setCardanoPrice] = useState('');
  const [solanaPrice, setSolanaPrice] = useState('');
  const [xrpPrice, setXrpPrice] = useState('');
  const [polkadotPrice, setPolkadotPrice] = useState('');
  const [litecoinPrice, setLitecoinPrice] = useState('');
  const [chainlinkPrice, setChainlinkPrice] = useState('');
  const [bitcoincashPrice, setBitcoincashPrice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Bitcoin data
        const newCryptoData = await fetchCryptoPrices();
        setBitcoinPrice(newCryptoData.BTC.USD);
        setEthereumPrice(newCryptoData.ETH.USD);
        setBinancePrice(newCryptoData.BNB.USD);
        setCardanoPrice(newCryptoData.ADA.USD);
        setSolanaPrice(newCryptoData.SOL.USD);
        setXrpPrice(newCryptoData.XRP.USD);
        setPolkadotPrice(newCryptoData.DOT.USD);
        setLitecoinPrice(newCryptoData.LTC.USD);
        setChainlinkPrice(newCryptoData.LINK.USD);
        setBitcoincashPrice(newCryptoData.BCH.USD);

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
      <div className="flex items-center">
        <SiBinance className="text-yellow-600" />
        <span className="ml-2">${binancePrice}</span>
      </div>
      <div className="flex items-center">
        <SiCardano className="text-blue-600" />
        <span className="ml-2">${cardanoPrice}</span>
      </div>
      <div className="flex items-center">
        <TbCurrencySolana className="text-green-600" />
        <span className="ml-2">${solanaPrice}</span>
      </div>
      <div className="flex items-center">
        <SiXrp className="text-black-600" />
        <span className="ml-2">${xrpPrice}</span>
      </div>
      <div className="flex items-center">
        <SiPolkadot className="text-pink-600" />
        <span className="ml-2">${polkadotPrice}</span>
      </div>
      <div className="flex items-center">
        <SiLitecoin className="text-gray-600" />
        <span className="ml-2">${litecoinPrice}</span>
      </div>
      <div className="flex items-center">
        <SiChainlink className="text-blue-600" />
        <span className="ml-2">${chainlinkPrice}</span>
      </div>
      <div className="flex items-center">
        <SiBitcoincash className="text-green-600" />
        <span className="ml-2">${bitcoincashPrice}</span>
      </div>
    </div>
  </div>
);
};


export default CryptoPrices;
