
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getSinglePackages, getPackages } from '../Service/api';

function Lifetime() {
  const { id } = useParams(); // Extract the package ID from the URL
  const navigate = useNavigate();
  const [packageDetails, setPackageDetails] = useState(null);
  const [packages, setPackages] = useState([]);

  // Fetch package details and related packages
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await getSinglePackages(id);
        setPackageDetails(response);

        const packageResponse = await getPackages();
        setPackages(packageResponse || []);
      } catch (error) {
        console.error('Failed to fetch package details or related packages', error);
      }
    };
    fetchPackageDetails();
  }, [id]);

  const addToCart = (packagename, pricePerItem, image, description) => {
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
        description
      });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart'); 
  };

  if (!packageDetails) return (
    <div className='min-h-screen flex justify-center items-center'>
      <p className='text-gray-600 font-bold'>Loading...</p>
    </div>
  );

  // Exclude the current package from the related products list
  // const relatedPackages = packages.filter(pkg => pkg.id !== id);
  const relatedPackages = packages.filter(pkg => pkg.id !== Number(id));
  return (
    <div className="p-8">
      {/* Main Membership Details */}
      <div className="flex flex-col md:flex-row items-center bg-white rounded-lg overflow-hidden">
        <div className="p-4">
          <img 
          
        src={`https://kahanifylaravel.kahanify.com/storage/app/public/${packageDetails.image}`}
          
          alt={packageDetails.name} className="w-full h-[350px] object-cover" />
        </div>
        <div className="md:w-1/2 md:self-start p-4">
          <h1 className="text-3xl lg:text-5xl pt-5 font-serif pb-4 md:pb-8 font-bold text-gray-800 mb-4">{packageDetails.name}</h1>
          <p className="text-xl mb-4 font-bold text-[#b7af54]">
            <span className="underline text-[#b7af54]">{`Rs ${packageDetails.price}`}</span>
          </p>
          <button
            className="bg-blue-600 text-white py-2 px-3 font-bold rounded hover:bg-blue-700 transition-transform duration-300 ease-in-out transform hover:scale-105"
            onClick={() => addToCart(packageDetails.name, packageDetails.price, packageDetails.image, packageDetails.Description)}
          >
            Purchase
          </button>
          <p className="mt-4">Category: <span className="hover:underline">Stories Subscription</span></p>
        </div>
      </div>

      {/* Membership Details List */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Membership Details</h1>
        <ul className="list-disc list-inside space-y-2">
          {packageDetails.Description.split('\n').map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Related Products */}
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Related Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPackages.map((pkg) => (
            <div key={pkg.id} className="flex flex-col py-4 items-center">
              <Link to={`/package/${pkg.id}`}>
                <img 
                  src={`https://kahanifylaravel.kahanify.com/storage/app/public/${pkg.image}`}
                  className="mb-3 h-[300px] w-[300px]" 
                  alt={pkg.name} 
                />
              </Link>
              <p className="text-2xl text-[#18003c] mb-1 font-bold">{pkg.name}</p>
              <p className="font-bold mb-2 text-pink-600 text-xl">
                <span className='underline'>{`Rs ${pkg.price}`}</span>
              </p>
              <button 
                className="bg-[#18003c] mb-3 text-white py-2 px-4 rounded hover:bg-pink-600 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50"
                onClick={() => addToCart(pkg.name, pkg.price, pkg.image)}
              >
                Purchase
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lifetime;
