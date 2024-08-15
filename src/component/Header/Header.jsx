import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { asset0 } from '../imageLoader';
import { getCurrentUser } from '../Service/api';
import { FaRegUser } from "react-icons/fa6";
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
<header className="bg-white text-black py-2 px-2 border-b-4 border-[#ff0087]">
      <div className="container  flex flex-wrap items-center">
        <Link
          to={membership ? "Paidcontent" : "/"}
          className="flex-shrink-0"
        >
          <img src={asset0} alt="Logo" className="h-[8vh] md:h-[12vh] w-auto" />
        </Link>

        <nav className="flex-1 flex justify-center mt-4 md:mt-0">
          <ul className="flex  md:flex-row  md:space-y-0 md:space-x-4 items-center">
            {isLoggedIn && (
                         <>
                         <li>
                           <NavLink
                             to="/Package"
                             className={({ isActive }) => 
                               `font-bold text-xs md:text-xl px-5 hover:text-pink-500 ${isActive ? "text-pink-500" : "text-[#18003c]"}`
                             }
                           >
                             All Stories
                           </NavLink>
                         </li>
                         <li>
                           <NavLink
                             to="/contact-us"
                             className={({ isActive }) => 
                               `font-bold text-xs md:text-xl px-5 hover:text-pink-500 ${isActive ? "text-pink-500" : "text-[#18003c]"}`
                             }
                           >
                             Contact Us
                           </NavLink>
                         </li>
                       </>
           )}
          </ul>
        </nav>

        <div className="relative mt-4 md:mt-0">
          {isLoggedIn ? (
            <div className="flex items-center relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center h-19 md:h-10 shadow-md transition-transform transform w-auto px-3 rounded-full border  bg-blue-100 text-sm md:text-base"
              >
                <FaRegUser />
      <span className='ml-1'>hey, {name}</span>
      <FaSortDown />
           </button>
              {isDropdownOpen && (
                <div className=" absolute right-0 mt-48 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10  ">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Profile
                  </Link>
              <Link to="/Member" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Membership Details
                  </Link>
                  <Link to="Order" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Order Details
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <button className="bg-blue-500 px-4 py-2 rounded text-white font-bold hover:bg-[#ff0087] transition-transform duration-300 ease-in-out transform hover:scale-105">
              <Link to="/login">Sign In</Link>
            </button>
          )}
        </div>
      </div>
    </header>
      );
}

export default Header;
