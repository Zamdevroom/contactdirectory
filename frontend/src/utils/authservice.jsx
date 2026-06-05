import axios from 'axios';
import Cookies from 'js-cookie';
import { USER_API } from './api';

const login = async (username, password) => {
  try {
    const response = await axios.post(`${USER_API}/signin`, {
      username,
      password,
    });
    if (response.data.message === 'Logged In') {
      Cookies.set('user', response.data.userID);
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Error signing in:', error);
    return null;
  }
};

const logout = () => {
  Cookies.remove('user');
};

const signup = async (firstname, lastname, username, password) => {
  try {
    const response = await axios.post(`${USER_API}/signup`, {
      firstname,
      lastname,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

const getCurrentUser = async () => {
  const token = Cookies.get('user');

  if (!token) {
    return null;
  }

  try {
    const response = await axios.get(`${USER_API}/current`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    Cookies.remove('user');
    return null;
  }
};

export default {
  login,
  logout,
  signup,
  getCurrentUser,
};
