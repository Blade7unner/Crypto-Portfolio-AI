import React from 'react';
import ChatGPT from '../components/ChatGPT';
import { NeuralNetwork } from '../components/NeuralNetwork';
import CryptoPrices from '../components/CryptoPrices';

function AI() {
  return (
    <div className='page'>
      <CryptoPrices />
      <ChatGPT />
      <NeuralNetwork />
    </div>
  );
}

export default AI;
