import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();
// Provide the context
export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const checkLoginStatus = (token) => {
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, logout, checkLoginStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};
