import React from 'react';
import { NavLink,Link } from 'react-router-dom';
import { asset24, asset25, asset26, asset27 } from "../imageLoader";

function Footer() {

  return (
    <footer className="bg-[#18003c] text-white py-4 border-t-4 border-[#ff0087]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-xs">Copyright © 2024 Khanify | Powered by Kahanify</p>
        </div>
        <nav className="w-full flex justify-center ">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5 items-center">
            <li>
              <NavLink
                to="/Privacy"
                className="hover:text-pink-600"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Conditions"
                className="hover:text-pink-600"
                aria-label="Terms and Conditions"
              >
                Terms and Conditions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Refund"
                className="hover:text-pink-600"
                aria-label="Refund Policy"
              >
                Refund Policy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/FAQs"
                className="hover:text-pink-600"
                aria-label="FAQ's"
              >
                FAQ's
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us"
                className="hover:text-pink-600  mr-3"
                aria-label="Contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="mt-4 md:mt-0">
          <ul className="flex justify-center space-x-2">
            <li>
              <Link to = 'https://www.facebook.com/KahanifyOfficial'>
              <img src={asset24} alt="Icon 1" className="h-6 w-6 hover:scale-105 md:h-8 md:w-8" />
              </Link>
            </li>
            <li>
            <Link to = 'https://www.instagram.com/kahanifyofficial/'>

              <img src={asset25} alt="Icon 2" className="h-6 w-6 md:h-8 hover:scale-105 md:w-8" />
              </Link>
              
            </li>
            <li>
            
              <img src={asset26} alt="Icon 3" className="h-6 w-6 md:h-8 hover:scale-105 md:w-8" />
              
            
            </li>
            <li>
            <Link to = 'https://www.youtube.com/channel/UCnrRuc4QSzlenj_Soet80uQ'>
            
              <img src={asset27} alt="Icon 4" className="h-6 w-6 md:h-8 hover:scale-105  md:w-8" />
              </Link>
            
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
