//This file is used by auth context

import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8000/user';

//Login
const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, {
      username,
      password,
    });
    if (response.data.message === 'Logged In') {
      Cookies.set('user', response.data.userID);
      return response.data;
    }
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

//Logout
const logout = () => {
  Cookies.remove('user');
};

//Signup
const signup = async (firstname, lastname, username, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      firstname,
      lastname,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

//Get current user                --------- to be implemented
const getCurrentUser = async () => {

  const token = Cookies.get('user');

  if (token) {
    const response = await axios.get(`${API_URL}/current`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    console.log('Current User:', response.data)
    return response.data;
  }
  return null;
};

export default {
  login,
  logout,
  signup,
  getCurrentUser,
};
