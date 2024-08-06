import React from 'react';
import { useNavigate } from 'react-router-dom';
import { asset31, asset32, asset33 } from "../imageLoader";
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';
 
function Package() {
  const navigate = useNavigate();

  const addToCart = (name, pricePerItem, image) => {
    const existingCart = Cookies.get('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];

    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex > -1) {
      cart[itemIndex].quantity += 1;
    } else {
      cart.push({
        name,
        pricePerItem,
        quantity: 1,
        image
      });
    }

    Cookies.set('cart', JSON.stringify(cart));
    navigate('/cart'); 
  };

  return (
    <>
    <Helmet>
        <title>Kahanify - Membership Packages</title>
        <meta name="description" content="Get access to all the audio stories on Kahanify with our annual and monthly membership packages. Enjoy unlimited stories and more!" />
        <meta name="keywords" content="audio stories, Kahanify, membership, annual membership, monthly membership, unlimited stories" />
        <meta property="og:title" content="Kahanify - Membership Packages" />
        <meta property="og:description" content="Get access to all the audio stories on Kahanify with our annual and monthly membership packages. Enjoy unlimited stories and more!" />
        <meta property="og:image" content={asset31} />
        <meta property="og:url" content="https://Kahanify.com/package" />
        <meta name="twitter:card" content="Kahanify" />
        <meta name="twitter:title" content="Kahanify - Membership Packages" />
        <meta name="twitter:description" content="Get access to all the audio stories on Kahanify with our annual and monthly membership packages. Enjoy unlimited stories and more!" />
        <meta name="twitter:image" content={asset31} />
      </Helmet>
      <div className="bg-white sm:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-center text-[#18003c] font-bold m-8">Get Access to All The Audio Stories on Kahanify</h2>

        <div className="container mx-auto flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-12 px-8 py-6">
          <div className="flex flex-col py-4 items-center">
            <img src={asset31} className="mb-3" alt="Annual" />
            <p className="text-2xl text-[#18003c] mb-3 font-bold">Annual Membership</p>
            <p className="font-bold mb-4 text-pink-700">Rs 1,460</p>
            <button className="bg-[#18003c] mb-3 text-white py-2 px-4 rounded hover:bg-pink-700 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-pink-600 hover:border-light-blue-300 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50"
              onClick={() => addToCart('Annual Membership', 1460, asset31)}
            >
              Purchase
            </button>
          </div>
          <div className="flex flex-col py-4 items-center">
            <img src={asset32} className="mb-3" alt="Phone Icon" />
            <p className="text-2xl mb-3 font-bold text-[#18003c]">Monthly Membership</p>
            <p className="font-bold text-pink-700 mb-4">Rs 280</p>
            <button className="bg-[#18003c] mb-3 text-white py-2 px-4 rounded hover:bg-pink-700 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-pink-600 hover:border-light-blue-300 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50"
              onClick={() => addToCart('Monthly Membership', 280, asset32)}
            >
              Purchase
            </button>
          </div>
        </div>

        <div className="flex bg-gray-100 items-center m-8 p-3 border-t border-sky-600">
          <img src={asset33} alt="#" className="w-4 h-4 mr-3" /><span className='text-gray-800'>Your cart is currently empty.</span>
        </div>
        <div className="flex bg-blue-100  items-center m-8 p-5 pl-12 border-l-4 border-green-500">
          <p className='pl-4'>You are logged in as username 
            <span className='font-bold'> Muhammad Luqman</span>
            if you would like to use a different account for this membership, log out now.
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md m-8">
          <div className='text-[#18003c]'>
            <h2 className="text-2xl font-bold mb-4">Membership Details</h2>
            <div className='text-sm'>
              <p className='mb-2'>This is an annual membership package.</p>
              <p className='mb-2'>The price for membership is PKR1460 now.</p>
              <p className='mb-2'> Membership expires after 1 year (365 Days)</p></div>
          </div>
          <h3 className="text-xl font-bold mb-4 mt-4">For Manual Payments</h3>
          <div className='text-sm'>
            <p className='mb-2'>Bank Transfer:</p>
            <p className='mb-2'>Account Title:<span className='font-bold text-black'> Digital Inception </span></p>
            <p className='mb-2'>IBAN/ACCOUNT NUMBER:<span className='font-bold text-black'> PK26BKIP0305000028870001 </span></p>
            <p className='mb-2'>BANK ISLAMI PAKISTAN LTD.</p>
            <p className='mb-2'>EasyPaisa:<span className='font-bold text-black'> 0345 8556127</span></p>
            <p className="text-sm text-gray-400"> <span className='font-bold'> Note:</span> For manual payments, please share screenshot of transaction on WhatsApp: <span className='font-bold text-black'>0332-0516548</span> </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Package;
