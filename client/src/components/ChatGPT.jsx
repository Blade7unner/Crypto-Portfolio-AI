import React, { useEffect, useState } from 'react';
import fetchCryptoPrices from './cryptoPricesApi';
//import { useGlobal } from "../contexts/GlobalContext";

function ChatGPT() {
  //Set state for loading status, filter, crypto prices, and price predictions
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
        setCryptoPrices({
          BTC: newCryptoData.BTC.USD,
          ETH: newCryptoData.ETH.USD,
          BNB: newCryptoData.BNB.USD,
          SOL: newCryptoData.SOL.USD, 
          ADA: newCryptoData.ADA.USD,
          XRP: newCryptoData.XRP.USD,
          DOT: newCryptoData.DOT.USD,
          LTC: newCryptoData.LTC.USD,
          LINK: newCryptoData.LINK.USD,
          BCH: newCryptoData.BCH.USD,
        });
        //Logic to set the price of the selected coin
        if (filter === 'Bitcoin') {
          setSelectCoinPrice(newCryptoData.BTC.USD);
        } 
        else if (filter === 'Ethereum') {
          setSelectCoinPrice(newCryptoData.ETH.USD);
        }
        else if (filter === 'Solana') {
          setSelectCoinPrice(newCryptoData.SOL.USD);
        }
        else if (filter === 'Cardano') {
          console.log('The filter function is working');
          setSelectCoinPrice(newCryptoData.ADA.USD);
        } 
        else if (filter === 'Binance') {
          setSelectCoinPrice(newCryptoData.BNB.USD);
        } 
        else if (filter === 'Ripple') {
          setSelectCoinPrice(newCryptoData.XRP.USD);
        }
        else if (filter === 'Polkadot') {
          setSelectCoinPrice(newCryptoData.DOT.USD);
        }
        else if (filter === 'Litecoin') {
          setSelectCoinPrice(newCryptoData.LTC.USD);
        }
        else if (filter === 'Chainlink') {
          setSelectCoinPrice(newCryptoData.LINK.USD);
        }
        else if (filter === 'Bitcoin Cash') {
          setSelectCoinPrice(newCryptoData.BCH.USD);
        }
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      }
    };
    fetchData();
    //Call the fetchData function when the filter state changes
  }, [filter]);

  console.log('Crypto Prices:', cryptoPrices);

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

  console.log(filter);

  return (
    <div className="p-4 max-w-4xl mx-auto"> {/* Centering container */}
      {/* Wrap select menu and button in a flex container for centering */}
      <div className="flex flex-col items-center space-y-4 mb-6">
        <div className="w-1/2"> {/* Half width wrapper for select menu */}
          <label className="block mb-4 w-full">
            Select a coin:
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              >
              <option value='Bitcoin'>BTC</option>
              <option value='Ethereum'>ETH</option>
              <option value='Binance'>BNB</option>
              <option value='Cardano'>ADA</option>
              <option value='Solana'>SOL</option>
              <option value='Ripple'>XRP</option>
              <option value='Polkadot'>DOT</option>
              <option value='Litecoin'>LTC</option>
              <option value='Chainlink'>LINK</option>
              <option value='Bitcoin Cash'>BCH</option>
            </select>
          </label>
        </div>
        <div className="w-1/2"> {/* Half width wrapper for button */}
          <button
            onClick={handleGetPredictionsClick}
            className="bg-orange-400 text-white text-xl rounded-lg w-full py-2 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
          >
            {isLoading ? 'Loading...' : 'Get ChatGPT Predictions'} {/* Conditional button text */}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="w-full table-auto text-center">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Timeframe</th>
              <th className="px-6 py-3">Prediction</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Render rows based on data availability */}
            <tr className="hover:bg-orange-50 transition duration-150 ease-in-out">
              <td className="px-6 py-4 text-xl font-medium">One Day</td>
              <td className="px-6 py-4">{oneDay ? oneDay : 'N/A'}</td>
            </tr>
            <tr className="hover:bg-orange-50 transition duration-150 ease-in-out">
              <td className="px-6 py-4 text-xl font-medium">Five Day</td>
              <td className="px-6 py-4">{fiveDay ? fiveDay : 'N/A'}</td>
            </tr>
            <tr className="hover:bg-orange-50 transition duration-150 ease-in-out">
              <td className="px-6 py-4 text-xl font-medium">Ten Day</td>
              <td className="px-6 py-4">{tenDay ? tenDay : 'N/A'}</td>
            </tr>
            <tr className="hover:bg-orange-50 transition duration-150 ease-in-out">
              <td className="px-6 py-4 text-xl font-medium">Thirty Day</td>
              <td className="px-6 py-4">{thirtyDay ? thirtyDay : 'N/A'}</td>
            </tr>
            <tr className="hover:bg-orange-50 transition duration-150 ease-in-out">
              <td className="px-6 py-4 text-xl font-medium">Six Months</td>
              <td className="px-6 py-4">{sixMonths ? sixMonths : 'N/A'}</td>
            </tr>
            <tr className="hover:bg-orange-50 transition duration-150 ease-in-out">
              <td className="px-6 py-4 text-xl font-medium">One Year</td>
              <td className="px-6 py-4">{oneYear ? oneYear : 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChatGPT;
