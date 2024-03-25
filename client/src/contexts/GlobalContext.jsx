import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  
  //add in state that I need

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
