import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGIN_MUTATION } from '../utils/mutations';
import * as auth from '../utils/auth'; // Adjust the path as necessary

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loginMutation, { error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data && data.login && data.login.token) {
        auth.login(data.login.token); // Use the login function from auth.js
        navigate('/');
      }
    },
    onError: (err) => {
      console.error(err.message);
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginMutation({ variables: { email, password } });
      // Navigation and login handling moved to the mutation's onCompleted
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="flex flex-col items-center justify-center">
        <h2 className="text-2xl p-4 font-bold">Log In</h2>
        <input
          className="text-center shadow appearance-none border border-red-500 rounded w-half py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="text-center shadow appearance-none border border-red-500 rounded w-half py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p className="text-center text-red-500 font-bold">{error.message}</p>}
        <button type="submit" className='bg-orange-400 text-2xl rounded-lg w-[160px] mt-4 p-2 hover:bg-green-400 text-white'>Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
