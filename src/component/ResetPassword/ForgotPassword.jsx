import React, { useState } from 'react';
export const API_URL = import.meta.env.VITE_API_URL;
import { toast } from 'react-toastify';
import load from '../../assets/Loader.gif'


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        handleForgotPassword(email);
    };

    const handleForgotPassword = async (email) => {
    setLoading(true);
        
        try {
            const response = await fetch( `${API_URL}/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            
          
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message); // Show success message
            } else {
                toast.error(data.errors.email[0]); // Show error message
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again later.');
        } finally{
            setLoading(false); 
          }
    };
    

    return (
      
      
        <div className='flex justify-center items-center min-h-[77vh]'>

        <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h1 className='font-bold text-xl mb-2'>Forgot Password</h1>
            
      <form onSubmit={handleSubmit}>
        
      <div className="mb-4 ">
          <label htmlFor="email" className='pt-4'> Enter valid Email Address:</label>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
                required
                className='border  border-gray-300 p-2 w-full rounded-md'
            />
            </div>
            <button type="submit"
             className="bg-blue-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mb-4 md:mb-0"
            >{
                loading ?<img src={load} alt="load" className='h-6 w-6' />  : 'Send Reset Link'
              }</button>
        </form>
</div>

</div>
    );
};

export default ForgotPassword;
