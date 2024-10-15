import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


export const API_URL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get('token');
    const email = params.get('email');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSubmit = async (data) => {
        await handleResetPassword(data.password, data.confirmPassword);
    };

    const handleResetPassword = async (newPassword, confirmPassword) => {
        try {
            const response = await fetch(`${API_URL}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    email,
                    password: newPassword,
                    password_confirmation: confirmPassword,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.errors.password[0]);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <div className='flex justify-center items-center min-h-[80vh]'>

                <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg border border-gray-200">
                    <h1 className='font-bold text-xl mb-2'>Reset Password</h1>

                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}


                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 relative flex items-center">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', {
                                    required: 'Password is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                                        message: 'Password must be 8-20 characters long.'
                                    }
                                })}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md`}
                            />
                            
                            <button
                                type="button"
                                className="absolute right-3 flex items-center top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>



                        <div className="mb-4 relative flex items-center">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                {...register('confirmPassword', {
                                    required: 'Confirm Password is required',
                                    validate: value => value === newPassword || 'Passwords must match'
                                })}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} p-2 w-full rounded-md`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 flex items-center top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                       

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105 hover:bg-pink-600"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>

        </>
    );
};

export default ResetPassword;
