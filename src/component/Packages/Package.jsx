import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { asset31, asset32, asset33 } from "../imageLoader";
import { Helmet } from 'react-helmet';
import { getCurrentUser, Manual } from '../Service/api';  
import Paidcontent from '../Paidcontent/Paidcontent'; 
import Loader from '../loader/Loader';
import { toast } from 'react-toastify';

function Package() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [membership, setMembership] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageName, setPackageName] = useState('');
  const [bankName, setBankName] = useState('default');
  const [paymentProof, setPaymentProof] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await getCurrentUser();
        console.log(response);

        if (response && response.user) {
          const user = response.user; 
          console.log(user);

          if (user.username) {
            console.log(user.username); 
            setName(user.username);    
          }
        }

        if (response && response.membership !== undefined) {
          setMembership(response.membership); 
          console.log(response.membership)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData();
  }, []);

  const addToCart = (packagename, pricePerItem, image) => {
    const existingCart = sessionStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];

    const itemIndex = cart.findIndex(item => item.packagename === packagename);

    if (itemIndex > -1) {
      cart[itemIndex].quantity += 1;
    } else {
      cart.push({
        packagename,
        pricePerItem,
        quantity: 1,
        image
      });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart'); 
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh] w-full">
        <Loader />
      </div>
    );
  }

  if (membership) {
    return <Paidcontent />; 
  }

  const handleSubmit = async (event) => {

    event.preventDefault();
  

const PackageName=packageName;
const BankName=bankName;
const payment_image=paymentProof;
try {
  await Manual( PackageName ,BankName, payment_image );
 } catch (error) {
  toast.error(error.response?.data?.message || error.message);
}
  }

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
            <Link to='/Yearly'>   
              <img src={asset31} className="mb-3" alt="Annual" />
            </Link>
            <p className="text-2xl text-[#18003c] mb-3 font-bold">Annual Membership</p>
            <p className="font-bold mb-4 text-pink-600 text-xl">
              <span className='text-gray-500 line-through'>Rs 2500</span> 
              <span className='underline'>Rs 1,460</span>
            </p>
            <button className="bg-[#18003c] mb-3 text-white py-2 px-4 rounded hover:bg-pink-600 transition-transform duration-300 ease-in-out transform hover:scale-105  hover:border-light-blue-300 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50"
              onClick={() => addToCart('Annual Membership', 1460 , asset31)}
            >
              Purchase
            </button>
          </div>
          <div className="flex flex-col py-4 items-center">
            <Link to='/Lifetime'>
              <img src={asset32} className="mb-3" alt="Phone Icon" />
            </Link>
            <p className="text-2xl mb-3 font-bold text-[#18003c]">Life Time Membership</p>
            <p className="font-bold text-pink-600 text-xl mb-4">
              <span className='text-gray-500 line-through'>Rs 7500</span> 
              <span className='underline'> Rs 4,990</span>
            </p>
            <button className="bg-[#18003c] mb-3 text-white py-2 px-4 rounded hover:bg-pink-600 transition-transform duration-300 ease-in-out transform hover:scale-105  hover:border-light-blue-300 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50"
              onClick={() => addToCart(' Life Time Membership', 4990 , asset32)}
            >
              Purchase
            </button>
          </div>
        </div>

        <div className="flex bg-gray-100 items-center m-8 p-3 border-t border-sky-600">
          <img src={asset33} alt="#" className="w-4 h-4 mr-3" />
          <span className='text-gray-800'>Your cart is currently empty.</span>
        </div>
        <div className="flex bg-blue-100 items-center m-8 p-5 pl-12 border-l-4 border-green-500">
          <p className='pl-4'>
            You are logged in as username 
            <span className='font-bold mx-1'> {name}</span>
            if you would like to use a different account for this membership, log out now.
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg  m-8">
          <h3 className="text-xl font-bold mb-4 mt-4">For Manual Payments</h3>
          <div className='text-sm'>
            <p className='mb-2'>Bank Transfer:</p>
            <p className='mb-2'>Account Title:<span className='font-bold text-black'> Digital Inception </span></p>
            <p className='mb-2'>IBAN/ACCOUNT NUMBER:<span className='font-bold text-black'> PK26BKIP0305000028870001 </span></p>
            <p className='mb-2'>BANK ISLAMI PAKISTAN LTD.</p>
            <p className='mb-2'>EasyPaisa:<span className='font-bold text-black'> 0345 8556127</span></p>
            <p className="text-sm text-gray-400">
              <span className='font-bold'> Note:</span> For manual payments, please share screenshot of transaction on WhatsApp: 
              <span className='font-bold text-black'>0332-0516548</span>
            </p>
            <button 
              onClick={handleOpenModal}
              className="bg-[#18003c] text-white my-8 py-2 px-4 rounded hover:bg-pink-600 transition-transform duration-300 ease-in-out transform hover:scale-105  hover:border-light-blue-300 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50"
            >
              Manual Payment
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <div className='flex justify-between'>
            <h3 className="text-xl font-bold mb-4">Manual Payment Form</h3>
            <button
              className=" text-black text-xl hover:text-gray-700"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            </div>
            <form>
              <div className="mb-4">
                <label htmlFor="package-name" className="block text-sm font-medium text-gray-700">Package Name</label>
                <input
                  type="text"
                  id="package-name"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}                
                  className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="bank-name" className="block text-sm font-medium text-gray-700">Bank Name</label>
                <select
                  id="bank-name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}                
                  className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="default">Select Bank</option>

                  <option value="BANK ISLAMI PAKISTAN LTD">BANK ISLAMI PAKISTAN LTD.</option>
                  <option value="EasyPaisa">Easy Paisa</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="payment-proof" className="block text font-medium text-gray-700">Upload Payment Proof</label>
                <input
                  type="file"
                  id="payment-proof"
                  onChange={(e) => setPaymentProof(e.target.files[0])}
                  className="mt-1 block w-full border py-1 sm:text-sm"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="bg-[#18003c] text-white py-2 px-4 rounded hover:bg-pink-600 transition-transform duration-300 ease-in-out transform hover:scale-105  hover:border-light-blue-300 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Package;
