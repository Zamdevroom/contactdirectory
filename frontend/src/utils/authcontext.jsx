//This is the authcontext which is used to provide the user details to the entire application

import React, { createContext, useContext, useEffect, useState } from 'react';
import authservice from './authservice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await authservice.getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const login = async (username, password) => {
    const response = await authservice.login(username, password);
    setUser(response);
  };

  const logout = () => {
    authservice.logout();
    setUser(null);
  };

  const signup = async (firstname, lastname, username, password) => {
    const response = await authservice.signup(
      firstname,
      lastname,
      username,
      password
    );
    setUser(response);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
