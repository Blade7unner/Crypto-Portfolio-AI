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
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>Sign Up</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default SignupForm;
