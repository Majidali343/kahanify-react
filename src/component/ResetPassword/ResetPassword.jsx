import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
export const API_URL = import.meta.env.VITE_API_URL;
const ResetPassword = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const token = params.get('token');
    const email = params.get('email');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleResetPassword(newPassword, confirmPassword);
    };

    const handleResetPassword = async (newPassword, confirmPassword) => {
        try {
            const response = await fetch(`${API_URL}/api/reset-password`, {
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
        <form onSubmit={handleSubmit}>
            <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                placeholder="New Password"
                required
            />
            <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="Confirm Password"
                required
            />
            <button type="submit">Reset Password</button>
        </form>
    );
};

export default ResetPassword;
