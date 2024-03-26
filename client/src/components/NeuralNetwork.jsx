import React, { useState, useEffect } from 'react';

export const NeuralNetwork = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://myapp.onrender.com/api/neuralNetworkPrediction');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='p-4 max-w-4xl mx-auto'>
      <h2 className='text-4xl font-semibold mb-6 text-orange-400 bg-clip-text'>Neural Network Predictions</h2>
      <div className='overflow-x-auto shadow-xl rounded-lg'>
        <table className='w-full table-auto text-center'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th className='px-6 py-3'>Crypto Currency</th>
              <th className='px-6 py-3'>Predictions</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {data &&
              data.map((item) => (
                <tr key={item._id} className='hover:bg-orange-50 transition duration-150 ease-in-out'>
                  <td className='px-6 py-4 text-xl font-medium'>{item.crypto_currency}</td>
                  <td className='px-6 py-4'>
                    <div className='flex flex-col items-center justify-center space-y-1'>
                      {item.predictions.map((prediction, index) => (
                        <span key={index} className='text-gray-700 font-light'>
                          Day {index + 1}: <span className='font-semibold text-orange-400'>{prediction.toFixed(2)}</span>
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
