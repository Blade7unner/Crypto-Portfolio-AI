import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useAuth } from '../contexts/AuthContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
  const { login } = useAuth(); // Use the login function from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      login(data.signup.token); // Use the token to set the login state
      // Directly navigate instead of using window.location.assign to avoid reloading the page
      navigate('/'); // Redirect to the home page or dashboard
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
