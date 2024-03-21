import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useAuth } from '../contexts/AuthContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Using AuthContext to manage login state
  const navigate = useNavigate(); // Using useNavigate for redirection
  const [loginMutation, { error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      login(data.login.token); // Update login state with the token
      navigate('/'); // Redirect to the home page after successful login
    },
    onError: (err) => {
      console.error(err.message); // It's a good practice to handle errors
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation({ variables: { email, password } });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Log In</h2>
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
        <button type="submit">Log In</button>
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
