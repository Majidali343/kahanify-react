import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import * as authService from '../Service/api';
import { useNavigate } from 'react-router-dom'; 
import { useForm } from 'react-hook-form'; 
import { login as authLogin } from '../store/authSlice'; 
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import load from '../../assets/Loader.gif'

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const login = async (data) => {
    console.log(data)
    setError("");
    setLoading(true);
    try {
      const response = await authService.login(data);
      if (response) {
        dispatch(authLogin({ 
          user: response.user, 
          token: response.token, 
          rememberMe: data.remember_me 
        }));
        navigate("/Package");
        
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-[80vh] p-4">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <Helmet>
          <title>Login | Kahanify</title>
          <meta property="og:title" content="Login | Kahanify" />
          <meta property="og:description" content="Login to your account on Kahanify." />
        <meta property="og:url" content="http://Kahanify.com" />
          <meta name="description" content="Login to your account on Kahanify." />
        </Helmet>
        
        <h1 className="text-black font-bold py-2 px-4 mb-4 text-xl rounded-t-lg">Sign In</h1>
        
        {error && <div className="text-red-500 font-bold text-center mb-4">{error}</div>}
        {errors.username_or_email && <span className="text-red-500 text-center font-bold text-sm">{errors.username_or_email.message}</span>}
        {errors.password && <span className="text-red-500 font-bold text-center text-sm">{errors.password.message}</span>}
        
        <form onSubmit={handleSubmit(login)}>
          <div className="mb-4 relative">
            <input
              type="text"
              id="username_or_email"
              name="username_or_email"
              {...register('username_or_email', { required: 'Username or Email is required' })} 
              className="border border-gray-300 rounded-md w-full py-2 px-3 pl-10 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Username / Email"
            />
            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              {...register('password', { required: 'Password is required' })} 
              className="border border-gray-300 rounded-md w-full py-2 px-3 pl-10 mt-1 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
            />
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="mb-4 flex items-center">
            <input type="checkbox" id="remember_me" name="remember_me" {...register('remember_me')} className="mr-2" />
            <label htmlFor="remember_me" className="text-sm text-gray-700">Keep me signed in on this device</label>
          </div>

          <button 
            type="submit" 
            className="w-full btn flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-600 hover:text-white transition-colors"
          >{
            loading ?<img src={load} alt="load" className='h-6 w-6' />  : 'Sign In'
          }
            
          </button>

          <div className='flex flex-col md:flex-row justify-between pt-6 text-sm'>
            <p>No account? <Link to='/signup' className='text-blue-600 hover:underline'> Sign Up</Link></p>
            <Link to='/ForgotPassword' className="text-gray-700 hover:underline">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
