import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from './Service/api';
import { useSelector } from 'react-redux';

const MemberRoute = ({ component: Component }) => {
    const [membership, setMembership] = useState(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = useSelector((state) => state.auth.status);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getCurrentUser();
                if (response && response.membership !== undefined) {
                    setMembership(response.membership);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        
        fetchUserData();
    }, []);

    if (loading) {
        return <div className='min-h-[90vh] flex justify-center items-center'>
            <h1 className='font-bold text-xl text-gray-700'>Loading...</h1>
            </div>; 
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return membership ? <Component /> : <Navigate to="/Package" />;
};

export default MemberRoute;
