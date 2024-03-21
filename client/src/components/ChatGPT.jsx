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
            setGptResponse(data.aiResponse);
        })
        .catch(error => {
            console.error('AI Error:', error);
        });
    }

    const handleGetPredictionsClick = async () => {
        sendMessageToServer('What is the future of Bitcoin?');
    };


    return (
        <div>
            <h1>Hello ChatGPT</h1>
            <p>Current Bitcoin Price: ${bitcoinPrice}</p>
            <button onClick={handleGetPredictionsClick}>Get Predictions</button>
            {gptResponse && <p>Prediction: {gptResponse}</p>}
        </div>
    );
};

export default ChatGPT;