import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice'; 
import { asset0 } from '../imageLoader';

function Header() {
  const dispatch = useDispatch();
  const { userData: user, status: isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); 
  };

  return (
    <header className="bg-white text-black py-2 border-b-4 border-[#ff0087]">
      <div className="container mx-auto flex flex-wrap items-center">
        <Link to="/" className="flex-shrink-0">
          <img src={asset0} alt="Logo" className="h-14 w-auto" />
        </Link>

        <nav className="flex-1 flex justify-center md:justify-start mt-4 md:mt-0">
          <ul className="flex space-x-4 items-center">
            {isLoggedIn && (
              <>
                <li className='text-[#18003c] font-bold'>
                  <Link to="/Package">All Stories</Link>
                </li>
                <li className='text-[#18003c] font-bold'>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
                <li>
                  <Link to="/profile">
                    {user?.profilePicture ? (
                      <img src={user.profilePicture} alt="Profile Picture" className="h-8 w-8 rounded-full" />
                    ) : (
                      <span className="h-8 w-8 rounded-full bg-gray-300"></span>
                    )}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="flex-shrink-0 mt-4 md:mt-0">
          {isLoggedIn ? (
            <button 
              onClick={handleLogout} 
              className='bg-[#ff0087] px-4 py-2 rounded hover:bg-[#18003c] mx-4 transition-transform duration-300 ease-in-out transform hover:scale-105'
            >
              Logout
            </button>
          ) : (
            <button 
              className='bg-blue-500 px-4 py-2 mx-4 rounded hover:bg-[#ff0087] transition-transform duration-300 ease-in-out transform hover:scale-105'
            >
              <Link to="/login" className='text-white font-bold'>Login</Link>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
