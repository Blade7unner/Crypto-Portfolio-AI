import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import AI from './pages/AI';
import apolloClient from './apolloClient';
import './App.css';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <>
        <a href="/">
          <div className="logo"><img src="/logo.svg" alt="Logo" /></div>
        </a>
        <Router>
          <div>
            <Navigation />
            <div className="page-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/AI" element={<AI />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
              </Routes>
            </div>
          </div>
        </Router>
      </>
    </ApolloProvider>
  );
}

export default App;
