import axios from 'axios';
import Cookies from 'js-cookie';

export const API_URL = import.meta.env.VITE_API_URL;
console.log('API_URL:', API_URL);

export const login = async (data) => {
  try {
    console.log (data)
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
export const signup = async (data) => {
  try {
    
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;

  } catch (error) {
    // console.error('Error signing up:', error.response.data.errors.email);
    console.error('Error signing up:', error.response.data.errors);
    throw  error;
  }
};

export const getCurrentUser = async () => {
  try {
    const token = Cookies.get('token');
    const response = await axios.get(`${API_URL}/usershow`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

export const changepassword = async ( new_password, current_password, confirm_password) => {
  try {
    
    console.log ("runing")
    const response = await axios.post(`${API_URL}/updatepassword`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      body: JSON.stringify({
          
          new_password,
          current_password,
          confirm_password
        }),
  });
    console.log (response)

    return response.passwords;
  } catch (error) {
    console.error('Error change password', error);
    throw error;
  }
};
