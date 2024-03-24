import React from 'react';
import ChatGPT from '../components/ChatGPT';
import { NeuralNetwork } from '../components/NeuralNetwork';

function AI() {
  return (
    <div className='page'>
      <h2>AI</h2>
      <p>Here is our AI page.</p>
      <ChatGPT />
      <NeuralNetwork />
    </div>
  );
}

export default AI;
