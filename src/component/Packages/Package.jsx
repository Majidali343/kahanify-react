
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getCurrentUser, Manual, getPackages } from '../Service/api';  
import Paidcontent from '../Paidcontent/Paidcontent'; 
import Loader from '../loader/Loader';
import { toast } from 'react-toastify';
import { asset31, asset32, asset33 } from "../imageLoader";

function Package() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [membership, setMembership] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageName, setPackageName] = useState('default');
  const [packagePrice, setPackagePrice] = useState('');
  const [packageid, setPackageid] = useState('');

  const [bankName, setBankName] = useState('default');
  const [paymentProof, setPaymentProof] = useState(null);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userResponse = await getCurrentUser();
        if (userResponse && userResponse.user) {
          const user = userResponse.user; 
          if (user.username) setName(user.username);
        }
        if (userResponse && userResponse.membership !== undefined) {
          setMembership(userResponse.membership);
        }
        
        // Fetch package data
        const packageResponse = await getPackages();
        setPackages(packageResponse || []);
      } catch (error) {
        console.error('Error fetching user or package data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData();
  }, []);

  const addToCart = (packagename, pricePerItem, image , description, id) => {
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
        image,
        description,
        id
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await Manual(packageName, bankName, paymentProof,packageid, packagePrice);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    const selectedPackage = packages.find((pkg) => pkg.name == packageName);
    if (selectedPackage) {
      setPackagePrice(selectedPackage.price);
      setPackageid(selectedPackage.id);
    } else {
      setPackagePrice(''); 
    }
  }, [packageName, packages]);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh] w-full">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Kahanify - Membership Packages</title>
        <meta name="description" content="Get access to all the audio and video stories and also read on Kahanify with our annual and monthly membership packages. Enjoy unlimited stories and more!" />
        <meta name="keywords" content="audio and video stories and also read stories, Kahanify, membership, annual membership, monthly membership, unlimited stories" />
        <meta property="og:title" content="Kahanify - Membership Packages" />
        <meta property="og:description" content="Get access to all the audio stories on Kahanify with our annual and monthly membership packages. Enjoy unlimited stories and more!" />
        {/* <meta property="og:image" content={asset31} /> */}
        <meta property="og:url" content="https://Kahanify.com/package" />
        <meta name="twitter:card" content="Kahanify" />
        <meta name="twitter:title" content="Kahanify - Membership Packages" />
        <meta name="twitter:description" content="Get access to all the audio stories and video stories and also read on Kahanify with our annual and monthly membership packages. Enjoy unlimited stories and more!" />
        {/* <meta name="twitter:image" content={asset31} /> */}
      </Helmet>
      <div className="bg-white sm:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-center text-[#18003c] font-bold m-8">Get Access to All The Audio Stories on Kahanify</h2>

        <div className="container mx-auto px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {packages.map((pkg) => (
    <div key={pkg.id} className="flex flex-col py-4 items-center">
      {/* <Link to={`/${pkg.route}`}> */}
      {/* <Link key={card.kahani_id} to={`/kahani/${card.kahani_id}`}> */}
      <Link to={`/package/${pkg.id}`}>
        <img 
        // src={pkg.image}
        src={`https://kahanifylaravel.kahanify.com/storage/app/public/${pkg.image}`}
        className="mb-3 h-[300px] w-[300px]" alt={pkg.name} />
      </Link>
      <p className="text-2xl text-[#18003c] mb-1 font-bold">{pkg.name}</p>
      <p className="font-bold mb-2 text-pink-600 text-xl">
        {/* <span className='text-gray-500 line-through'>{`Rs ${pkg.price}`}</span>  */}
        <span className='underline'>{`Rs ${pkg.price}`}</span>
      </p>
      <button 
        className="bg-[#18003c] mb-3 text-white py-2 px-4 rounded hover:bg-pink-600 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50"
        onClick={() => addToCart(pkg.name, pkg.price, pkg.image , pkg.Description, pkg.id)}
      >
        Purchase
      </button>
    </div>
  ))}
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
        <div className="p-4 bg-white rounded-lg m-8">
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
                className="text-black text-xl hover:text-gray-700"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <form>




              <div className="mb-4">
                <label htmlFor="package-name" className="block text-sm font-medium text-gray-700">Package Name</label>
                <select
                  id="package-name"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}                
                  className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="default">Select Package</option>
            {packages.map((pkg) => ( 
                  <option value={pkg.name}>{pkg.name}</option>
              
            ))}         
</select>
              </div>
              



              <div className="mb-4">
                <label htmlFor="package-price" className="block text-sm font-medium text-gray-700">Package Price</label>
                <input type='text'
                  id="package-price"
                  value={packagePrice}
                  onChange={(e) => setPackagePrice(e.target.value)}                
                  className="mt-1 block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                readOnly
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
                  className="mt-1 block w-full border-none py-1 sm:text-sm"
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
