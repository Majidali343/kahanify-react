import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleForgotPassword(email);
    };

    const handleForgotPassword = async (email) => {
        
        try {
            const response = await fetch('http://localhost:8000/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            
          
            const data = await response.json();
            if (response.ok) {
                alert(data.message); // Show success message
            } else {
                alert(data.errors.email[0]); // Show error message
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
                required
            />
            <button type="submit">Send Reset Link</button>
        </form>
    );
};

export default ForgotPassword;
