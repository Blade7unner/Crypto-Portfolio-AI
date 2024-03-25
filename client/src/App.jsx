import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import AI from './pages/AI';
import FavoritesPage from './components/FavoritesPage';
import apolloClient from './apolloClient.js';
import { AuthProvider } from './contexts/AuthContext';
import CryptoPrices from './components/CryptoPrices';
import MembershipCheckout from './components/MembershipCheckout';
import './index.css';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <a href='/'>
          <div className='logo'>
            <img src='/logo.svg' alt='Logo' />
          </div>
        </a>
        <Router>
          <div>
            <Navigation />
            <div className='page-container'>
              <CryptoPrices />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/AI' element={<AI />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/signup' element={<SignupForm />} />
                <Route path='/favorites' element={<FavoritesPage />} />
                <Route path='/payment' element={<MembershipCheckout />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
