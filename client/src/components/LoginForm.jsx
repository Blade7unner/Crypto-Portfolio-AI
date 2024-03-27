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
      <form onSubmit={handleLogin}>
        <h2>Log In</h2>
        <input
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className='bg-orange-400 text-2xl rounded-lg w-[220px] items-center flex justify-center mt-4 hover:bg-green-400'>Log In</button>
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
