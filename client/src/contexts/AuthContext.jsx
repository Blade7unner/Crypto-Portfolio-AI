import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);

  // Attempt to read the user's auth status from local storage on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Optionally, you could also load the user's favorites here if stored or make an API call to fetch them
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token); // Store token for session persistence
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token'); // Clear token
    setIsLoggedIn(false);
  };

  const value = { isLoggedIn, login, logout, userFavorites, setUserFavorites };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
