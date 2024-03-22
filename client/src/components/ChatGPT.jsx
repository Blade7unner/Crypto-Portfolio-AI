import React, { useEffect, useState } from "react";
import axios from 'axios';

function ChatGPT() {
    const [bitcoinPrice, setBitcoinPrice] = useState('');
    const [gptResponse, setGptResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState('bitcoin'); // State to track the filter option



    function sendMessageToServer(prompt) {
        setIsLoading(true);
  
        fetch('http://localhost:3001/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: prompt }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setGptResponse(data.oneDay);
            setIsLoading(false);
        })
        .catch(error => {
            console.error('AI Error:', error);
            setIsLoading(false);
        });
    }



    const handleGetPredictionsClick = async () => {
        sendMessageToServer(`If the current price of ${filter} is $5000 can you estimate what the price is trending towards based on past market activity. What will be price in 1 day, 5 days, 10 days, 30 days, 6 months, and 1 year? Each response should be a JSON object in the format {oneDay: estimate, fiveDay:estimate, 10Day:estimate,thirtyDay:estimate, sixMonths:estimate, oneYear:estimate}, where estimate are all numbers with dollar signs. Remember, only return JSON object!`);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };


    return (
        <div>
            <h1>Hello ChatGPT</h1>
            <label>
            Select a coin: 
                <select value={filter} onChange={handleFilterChange}>
                    <option value="bitcoin">BTC</option>
                    <option value="etherium">ETH</option>
                </select>
            </label>
            <p>Current Bitcoin Price: ${bitcoinPrice}</p>
            <button onClick={handleGetPredictionsClick}>Get ChatGPT Predictions</button>
            <p>{isLoading ? 'Loading...' : gptResponse}</p>
            <p>{filter}</p>
        </div>
    );
};

export default ChatGPT;