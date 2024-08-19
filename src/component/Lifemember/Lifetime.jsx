import React from 'react';
import Year from '../../assets/life.avif';
import { asset31 } from '../imageLoader';
import { useNavigate } from 'react-router-dom';

function Lifetime() {
  const navigate = useNavigate();

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

  return (
    <div className="p-8  ">
      {/* Main Membership Details */}
      <div className="flex flex-col md:flex-row items-center bg-white  rounded-lg overflow-hidden">
        <div className="md:w-1/2 p-4">
          <img src={Year} alt="Annual Membership" className="w-full h-[350px] object-cover" />
        </div>
        <div className="md:w-1/2 md:self-start p-4">
          <h1 className="text-3xl lg:text-5xl pt-5 font-serif pb-4 md:pb-8 font-bold text-gray-800 mb-4">Life Time Membership</h1>
          <p className="text-xl mb-4 font-bold text-[#b7af54]">
            <span className=" font-normal text-[#dddcb4] line-through">Rs7,500</span> <span className="underline text-[#b7af54]">Rs4,900</span>
          </p>
          <button
            className="bg-blue-600 text-white py-2 px-3 font-bold rounded hover:bg-blue-700 transition-transform duration-300 ease-in-out transform hover:scale-105"
            onClick={() => addToCart(' Life Time Membership', 4990 , Year)}
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
          <li>Pay once and enjoy forever-no renewals, no recurring payments!</li>
          <li>Unlimited online access to all the captivating stories on kahanify.</li>
          <li>Available in both written and narrated formats</li>
          <li>Experience safe & secure ad-free content.</li>
          <li>Lock your mobile screen and keep listening to stories in the background</li>
          <li>Non-stop service available 24/7.</li>
          <li>Share your feedback with our rating and reviews feature.</li>
          <li>Get 2 free annual memberships for friends and family!</li>

        </ul>
      </div>

      {/* Related Products */}
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Related Products</h1>
        <div className="flex flex-col items-start bg-white  overflow-hidden">
       <div className='flex items-center justify-center flex-col'>
          <img src={asset31} alt="Related Product" className=" object-cover mb-4" />
          <p className="text-xl font-bold text-center text-gray-800 mb-2">Annual Membership</p>
          <p className="text-xl font-bold text-center  mb-4">
            <span className=" text-[#dddcb4] line-through">Rs 2500</span> <span className="text-[#b7af54] underline">Rs 1,460</span>
          </p>
          <button
            className="bg-blue-600 text-white text-center  py-2 px-4 rounded hover:bg-blue-700 transition-transform duration-300 ease-in-out transform hover:scale-105"
            onClick={() => addToCart('Annual Membership', 1460, asset31)}
          >
            Purchase
          </button>
          </div> </div>
      </div>
    </div>
  );
}

export default Lifetime;
