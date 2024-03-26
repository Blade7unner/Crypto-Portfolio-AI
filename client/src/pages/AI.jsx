import React from 'react';
import ChatGPT from '../components/ChatGPT';
import { NeuralNetwork } from '../components/NeuralNetwork';

function AI() {
  return (
    <div className='page'>
      <ChatGPT />
      <NeuralNetwork />
    </div>
  );
}

export default AI;
