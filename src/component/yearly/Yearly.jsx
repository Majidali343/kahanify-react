import React from 'react'
import Annual from '../../assets/annual.jpg'
import {asset32} from '../imageLoader';
function Yearly() {

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
    <div>
      <div>
        <div>
        <img src={Annual} alt="Annual" />
        </div>
        <div>
            <h1>Annual Membership</h1>
            <p><span>Rs2,500</span>Rs1,460 </p>
            <button>Parchase</button>
            <p>Category: <span>Stories Subscription</span></p>
        </div>
      </div>
<div>

    <h1>Membership Details</h1>
    <ul>
<li>Enjoy online access to all the captivating stories on Kahanify.
</li>
<li>  Available in both written and narrated formats.
</li>
<li> Experience safe & secure ad-free content.
</li>
<li>Lock your mobile screen and keep listening to stories in the background
</li>
<li>Non-stop service available 24/7 for 365 days.
</li>
<li> Share your feedback with our rating and reviews feature.
</li>
    </ul>
</div>

<div>
<h1>Related products</h1>
<div>
<div className="flex flex-col py-4 items-center">
            <img src={asset32} className="mb-3" alt="Phone Icon" />
            <p className="text-2xl mb-3 font-bold text-[#18003c]">Life Time Membership</p>
            <p className="font-bold text-pink-600 text-xl mb-4"> <span className='text-gray-500 line-through'>Rs 7500</span> <span className='underline'> Rs 4,990</span></p>
            <button className="bg-[#18003c] mb-3 text-white py-2 px-4 rounded hover:bg-pink-600 transition-transform duration-300 ease-in-out transform hover:scale-105  hover:border-light-blue-300 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50"
              onClick={() => addToCart(' Life Time Membership', 4990 , asset32)}
            >
              Purchase
            </button>
          </div>
</div>
</div>
    </div>
  )
}

export default Yearly
