import React, { createContext, useContext, useEffect, useState } from 'react';
import authservice from './authservice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await authservice.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (username, password) => {
    const response = await authservice.login(username, password);
    if (response) {
      const currentUser = await authservice.getCurrentUser();
      setUser(currentUser);
      return true;
    }
    return false;
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
    return response;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
