import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { SIGNUP_MUTATION } from '../utils/mutations';
import * as auth from '../utils/auth'; // Adjust the path as necessary

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      if (data && data.signup && data.signup.token) {
        auth.login(data.signup.token); // Use the login function from auth.js
        setSuccessMessage('Signup successful! Redirecting...');
        setTimeout(() => navigate('/'), 2000); // Redirect after a short delay
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setSuccessMessage('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ variables: { email, password } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <h2 className="text-2xl p-4 font-bold">Sign Up</h2>
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
        {errorMessage && <p className="text-center text-red-500 font-bold">{errorMessage}</p>}
        {successMessage && <p className="text-center text-green-500 font-bold">{successMessage}</p>}
        <button type="submit" disabled={loading} className='bg-orange-400 text-2xl rounded-lg w-[160px] mt-4 p-2 hover:bg-green-400 text-white'>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
