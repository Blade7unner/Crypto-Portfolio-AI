import React, { useEffect, useState } from 'react';
import fetchCryptoPrices from './cryptoPricesApi';
//import { useGlobal } from "../contexts/GlobalContext";

function ChatGPT() {
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('Bitcoin');
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [selectCoinPrice, setSelectCoinPrice] = useState(0);
  const [oneDay, setOneDay] = useState(0);
  const [fiveDay, setFiveDay] = useState(0);
  const [tenDay, setTenDay] = useState(0);
  const [thirtyDay, setThirtyDay] = useState(0);
  const [sixMonths, setSixMonths] = useState(0);
  const [oneYear, setOneYear] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Bitcoin data
        const newCryptoData = await fetchCryptoPrices();
        setCryptoPrices({ BTC: newCryptoData.BTC.USD, ETH: newCryptoData.ETH.USD });
        if (filter === 'Bitcoin') {
          console.log('The filter function is woring');
          setSelectCoinPrice(newCryptoData.BTC.USD);
        }
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };
    fetchData();
  }, []);

  function sendMessageToServer(prompt) {
    setIsLoading(true);

    fetch('https://crypto-portfolio-ai.onrender.com/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //Update each state with the corresponding response
        setOneDay(data.oneDay);
        setFiveDay(data.fiveDay);
        setTenDay(data.tenDay);
        setThirtyDay(data.thirtyDay);
        setSixMonths(data.sixMonths);
        setOneYear(data.oneYear);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('AI Error:', error);
        setIsLoading(false);
      });
  }

  console.log('Select Coin Newest:' + selectCoinPrice);

  const handleGetPredictionsClick = async () => {
    sendMessageToServer(
      `If the current price of ${filter} is $${selectCoinPrice} can you estimate what the price is trending towards based on past market activity. What will be price in 1 day, 5 days, 10 days, 30 days, 6 months, and 1 year? Each response should be a JSON object in the format {oneDay: estimate, fiveDay:estimate, tenDay:estimate,thirtyDay:estimate, sixMonths:estimate, oneYear:estimate}, where estimate are all numbers with dollar signs and no decimal places. Remember, only return JSON object!`,
    );
    console.log('THIS IS THE COIN PRICE: ' + selectCoinPrice);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    if (filter === 'Bitcoin') {
      setSelectCoinPrice(cryptoPrices.ETH);
    } else if (filter === 'Ethereum') {
      setSelectCoinPrice(cryptoPrices.BTC);
    }
  };

  return (
    <div>
      <label>
        Select a coin:
        <select value={filter} onChange={handleFilterChange}>
          <option value='Bitcoin'>BTC</option>
          <option value='Ethereum'>ETH</option>
        </select>
      </label>
      {/* <p>Current Bitcoin Price: {cryptoPrices.BTC}</p>
      <p>Current Ethereum Price: {cryptoPrices.ETH}</p>
      <p>Selected Coin: {filter}</p>
      <p>Selected Coin Price: ${selectCoinPrice}</p> */}
      <button onClick={handleGetPredictionsClick} className='bg-orange-400 text-2xl rounded-lg w-[220px] items-center flex justify-center mt-4 hover:bg-green-400'>
        Get ChatGPT Predictions
      </button>
      <p>{isLoading ? 'Loading...' : 'One Day: ' + oneDay}</p>
      <p>{isLoading ? '' : 'Five Days: ' + fiveDay}</p>
      <p>{isLoading ? '' : 'Ten Days: ' + tenDay}</p>
      <p>{isLoading ? '' : 'Thirty Days: ' + thirtyDay}</p>
      <p>{isLoading ? '' : 'Six Months: ' + sixMonths}</p>
      <p>{isLoading ? '' : 'One Year: ' + oneYear}</p>
    </div>
  );
}

export default ChatGPT;
