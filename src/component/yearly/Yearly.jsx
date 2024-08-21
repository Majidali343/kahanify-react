import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Annual from '../../assets/annual.jpg';
import { asset32 } from '../imageLoader';

function Yearly() {
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
    <div className="p-8">
      {/* Main Membership Details */}
      <div className="flex flex-col md:flex-row items-center bg-white rounded-lg overflow-hidden">
        <div className="md:w-1/2 p-4">
          <img src={Annual} alt="Annual Membership" className="w-full h-[350px] object-cover" />
        </div>
        <div className="md:w-1/2 md:self-start p-4">
          <h1 className="text-3xl lg:text-5xl pt-5 font-serif pb-4 md:pb-8 font-bold text-gray-800 mb-4">Annual Membership</h1>
          <p className="text-xl mb-4 font-bold text-[#b7af54]">
            <span className="font-normal text-[#dddcb4] line-through">Rs2,500</span> <span className="underline text-[#b7af54]">Rs1,460</span>
          </p>
          <button
            className="bg-blue-600 text-white py-2 px-3 font-bold rounded hover:bg-blue-700 transition-transform duration-300 ease-in-out transform hover:scale-105"
            onClick={() => addToCart('Annual Membership', 1460, Annual)}
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
          <li>Enjoy online access to all the captivating stories on Kahanify.</li>
          <li>Available in both written and narrated formats.</li>
          <li>Experience safe & secure ad-free content.</li>
          <li>Lock your mobile screen and keep listening to stories in the background.</li>
          <li>Non-stop service available 24/7 for 365 days.</li>
          <li>Share your feedback with our rating and reviews feature.</li>
        </ul>
      </div>

      {/* Related Products */}
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Related Products</h1>
        <div className="flex flex-col items-start bg-white overflow-hidden">
          <div className='flex items-center justify-center flex-col py-4'>
          <Link to='/Lifetime'>   <img src={asset32} alt="Related Product" className="object-cover mb-4" /> </Link>
            <p className="text-xl font-bold text-center text-gray-800 mb-2">Life Time Membership</p>
            <p className="text-xl font-bold text-center mb-4">
              <span className="text-[#dddcb4] line-through">Rs 7500</span> <span className="text-[#b7af54] underline">Rs 4,990</span>
            </p>
            <button
              className="bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition-transform duration-300 ease-in-out transform hover:scale-105"
              onClick={() => addToCart('Life Time Membership', 4990, asset32)}
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Yearly;
