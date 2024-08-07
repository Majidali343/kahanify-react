import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  userData: null,
  token: null,
  status: false,
};

const getAuthFromCookies = () => {
  const userData = Cookies.get('userData');
  const token = Cookies.get('token');
  return {
    userData: userData ? userData : null,
    token: token || null,
    status: !!token, 
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getAuthFromCookies(), 
  reducers: {
    login: (state, action) => {
      const { user, token, rememberMe } = action.payload;
      state.userData = user;
      state.token = token;
      state.status = true;

      const cookieExpiry = rememberMe ? 7 : 0.083; 
      Cookies.set('userData', JSON.stringify(user), { expires: cookieExpiry });
      Cookies.set('token', token, { expires: cookieExpiry });
    },
    logout: (state) => {
      state.userData = null;
      state.token = null;
      state.status = false;
      Cookies.remove('userData');
      Cookies.remove('token');
    },
    setAuthState: (state, action) => {
      const { user, token } = action.payload;
      state.userData = user;
      state.token = token;
      state.status = true;
      Cookies.set('userData', JSON.stringify(user));
      Cookies.set('token', token);
    }
  },
});

export const { login, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
