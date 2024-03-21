import React, { useEffect, useState } from "react";
import axios from 'axios';

function ChatGPT() {
    const [bitcoinPrice, setBitcoinPrice] = useState('');
    const [gptResponse, setGptResponse] = useState('');



    function sendMessageToServer(prompt) {
  
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
        })
        .catch(error => {
            console.error('AI Error:', error);
        });
    }

    const handleGetPredictionsClick = async () => {
        sendMessageToServer("If I provide you with market data can you estimate what etherium price is trending towards based on past market activity. What will be price in 1 day, 5 days, 10 days, 30 days, 6 months, and 1 year? Each response should be a JSON object in the format {oneDay: estimate, fiveDay:estimate, 10Day:estimate,thirtyDay:estimate, sixMonths:estimate, oneYear:estimate}, where estimate are all numbers. Remember, only return JSON object!");
    };


    return (
        <div>
            <h1>Hello ChatGPT</h1>
            <p>Current Bitcoin Price: ${bitcoinPrice}</p>
            <button onClick={handleGetPredictionsClick}>Get Predictions</button>
            <p>{gptResponse}</p>
        </div>
    );
};

export default ChatGPT;