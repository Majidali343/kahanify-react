import axios from 'axios';
import Cookies from 'js-cookie';

export const API_URL = import.meta.env.VITE_API_URL;
console.log('API_URL:', API_URL);

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: data.rememberMe ? 7 : 0.083 });
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
//git check
export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: 0.083 });
    }
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const token = Cookies.get('token');
    const response = await axios.get(`${API_URL}/current-user`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};
