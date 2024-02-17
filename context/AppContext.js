// context/AppContext.js
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user authentication status
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius'); // Store preferred temperature unit

  return (
    <AppContext.Provider value={{ user, setUser, temperatureUnit, setTemperatureUnit }}>
      {children}
    </AppContext.Provider>
  );
};