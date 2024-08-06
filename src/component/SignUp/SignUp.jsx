import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import * as authService from '../Service/api';
import { login } from '../store/authSlice'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../Css/SignUp.css';
import { Helmet } from 'react-helmet';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('password');
  
  const create = async (data) => {
    setError("");
    try {
      const response = await authService.signup(data);
      if (response) {
        const userData = await authService.getCurrentUser();
        dispatch(login({ user: userData, token: response.token })); ////
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-screen">
      <Helmet>
        <title>Sign Up | Kahanify</title>
        <meta property="og:url" content="http://Kahanify.com" />
        <meta property="og:title" content="Sign Up | Kahanify" />
        <meta property="og:description" content="Create an account to start your membership with Kahanify. Sign up for exclusive features and updates." />
          <meta name="description" content="Create an account to start your membership with Kahanify." />
      
      </Helmet>
      
      <h1 className='font-bold text-center text-[#18003c] text-2xl md:text-3xl my-4'>Create Account To Start Your Membership</h1>
      <h1 className='text-center text-xl md:text-2xl mb-4'>Few more steps and you're done!</h1>
    
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h1 className='font-bold text-xl mb-2'>Sign Up</h1>
        
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>} 
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>} 
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>} 
        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>} 
        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>} 
        {errors.terms && <span className="text-red-500 text-sm">{errors.terms.message}</span>} 


        <form onSubmit={handleSubmit(create)}>
        
          <div className="mb-4 relative">
            <input
              type="text"
              id="username"
              name="username"
              {...register('username', { required: 'Username is required' })} 
              className="form-input transition-all duration-300 ease-in-out border-gray-300 rounded-md w-full py-2 px-3 pl-10 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="User Name"
            />
            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <div className="mb-4 relative">
            <input
              type="email"
              id="email"
              name="email"
              {...register('email', { required: 'Email is required' })} 
              className="form-input transition-all duration-300 ease-in-out border-gray-300 rounded-md w-full py-2 px-3 pl-10 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email"
            />
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <div className="mb-4 relative">
            <input
              type="tel"
              id="phone"
              name="phone"
              {...register('phone', { required: 'Phone Number is required' })} 
              className="form-input transition-all duration-300 ease-in-out border-gray-300 rounded-md w-full py-2 px-3 pl-10 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Phone Number"
            />
            <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <div className="mb-4 relative flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              {...register('password', { 
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                  message: 'Password must be 8-20 characters long, include at least one capital letter and one number.'
                }
              })} 
              className="form-input transition-all duration-300 ease-in-out border-gray-300 rounded-md w-full py-2 px-3 pl-10 mt-1 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
            />
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <button
              type="button"
              className="absolute right-3 flex items-center top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="mb-4 text-gray-600 text-xs">
            The password must have a minimum of 8 characters, including numbers and letters, with at least 1 capital letter, and should not exceed 20 characters.
          </div>

          <div className="mb-4 relative flex items-center">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              {...register('confirmPassword', { 
                required: 'Confirm Password is required',
                validate: value => value === password || 'Passwords must match'
              })} 
              className="form-input transition-all duration-300 ease-in-out border-gray-300 rounded-md w-full py-2 px-3 pl-10 mt-1 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm Password"
            />
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <button
              type="button"
              className="absolute right-3 flex items-center top-1/2 transform -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="mb-4 flex items-center">
            <input type="checkbox" id="terms" name="terms" {...register('terms', { required: 'You must accept the terms' })} className="mr-2" />
            <label htmlFor="terms" className="text-sm text-gray-700">I accept the Terms of Service and Privacy Policy</label>
          </div>

          <button 
            type="submit" 
            id="signup-btn"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-pink-600"
          >
            Sign Up
          </button>
        </form>

        <p className='py-3 text-center'> Have an account? <Link to='/login' className='text-blue-500'> Sign In</Link></p>
      </div>
    </div>
  );
}

export default SignUp;
