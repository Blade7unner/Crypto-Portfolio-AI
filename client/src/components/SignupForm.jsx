import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      login(data.signup.token);
      navigate('/');
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
