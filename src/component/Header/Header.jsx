import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { asset0 } from '../imageLoader';
import { getCurrentUser } from '../Service/api';
import { FaRegUser } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";

function Header() {
  const [name, setName] = useState('');
  const [membership, setMembership] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userData: user, status: isLoggedIn } = useSelector((state) => state.auth);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await getCurrentUser();
      if (response && response.user) {
        const user = response.user;
        if (user.username) {
          setName(user.username);
        }
        if (response.membership !== undefined) {
          setMembership(response.membership);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn, fetchUserData]);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return (
    <header className="bg-white text-black border-b-4 border-[#ff0087]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-4">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => document.getElementById('mobile-menu').classList.toggle('hidden')}
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`block h-6 w-6 ${isLoggedIn ? 'sm:visible' : 'sm:invisible'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" className={` ${isLoggedIn ? 'visible' : 'invisible'}`} />
              </svg>
              <svg className={`hidden h-6 w-6 ${isLoggedIn ? 'visible' : 'invisible'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" className={` ${isLoggedIn ? 'visible' : 'invisible'}`}/>
              </svg>
            </button>
          </div>

          {/* Logo and Navigation Links */}
          <div className={`flex flex-1 items-center ${isLoggedIn ? 'pl-16' : 'justify-between'}  md:justify-between` }>
            {/* Logo - Centered for Logged-In Users */}
            <div className={`flex ${isLoggedIn ? 'sm:justify-center' : 'sm:justify-start'} flex-shrink-0 items-center`}>
              <Link
                to={membership ? "/Paidcontent" : "/"}
                className="flex-shrink-0"
              >
                <img src={asset0} alt="Logo" className="h-16 w-auto" />
              </Link>
            </div>

            {/* Center Navigation Links */}
            {isLoggedIn && (
              <nav className="hidden sm:flex sm:items-center sm:justify-center flex-1">
                <div className="flex space-x-4">
                  <NavLink
                    to="/Package"
                    className={({ isActive }) => 
                      `font-bold text-xs md:text-xl px-5 hover:text-pink-500 ${isActive ? "text-pink-500" : "text-[#18003c]"}`
                    }
                  >
                    All Stories
                  </NavLink>
                  <NavLink
                    to="/contact-us"
                    className={({ isActive }) => 
                      `font-bold text-xs md:text-xl px-5 hover:text-pink-500 ${isActive ? "text-pink-500" : "text-[#18003c]"}`
                    }
                  >
                    Contact Us
                  </NavLink>
                </div>
              </nav>
            )}
          </div>

          {/* User Menu or Sign In Button */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="relative flex items-center rounded-full px-2 py-2 bg-blue-100 text-sm text-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Open user menu</span>
                  <FaRegUser />
                  <span className='ml-2'>hey, {name}</span>
                  <FaSortDown className="ml-1" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link to="/Member" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Membership Details
                    </Link>
                    <Link to="Order" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Order Details
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-blue-500 px-4 py-2 rounded text-white font-bold hover:bg-[#ff0087] transition-transform duration-300 ease-in-out transform hover:scale-105">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {isLoggedIn && (
            <>
              <NavLink
                to="/Package"
                className={({ isActive }) => 
                  `block font-bold text-base md:text-xl px-5 hover:text-pink-500 ${isActive ? "text-pink-500" : "text-[#18003c]"}`
                }
              >
                All Stories
              </NavLink>
              <NavLink
                to="/contact-us"
                className={({ isActive }) => 
                  `block font-bold text-base md:text-xl px-5 hover:text-pink-500 ${isActive ? "text-pink-500" : "text-[#18003c]"}`
                }
              >
                Contact Us
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
