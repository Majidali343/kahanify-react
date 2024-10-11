import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getCurrentUser, parchacemembership, getlogout, postCoupon  } from '../Service/api'; 
import { toast } from 'react-toastify'; 
import load from '../../assets/Loader.gif'
import { useNavigate } from 'react-router-dom'; 
import Paidcontent from '../Paidcontent/Paidcontent';

function Cart() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [membership, setMembership] = useState(false); 
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = sessionStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  // const handleIncrement = (index) => {
  //   const updatedCart = [...cart];
  //   if (updatedCart[index].packagename === 'Annual Membership') {
  //     updatedCart[index].quantity += 1;
  //     setCart(updatedCart);
  //     sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  //   }
  // };
  
  // const handleDecrement = (index) => {
  //   const updatedCart = [...cart];
  //   if (updatedCart[index].packagename === 'Annual Membership') {
  //     if (updatedCart[index].quantity > 1) {
  //       updatedCart[index].quantity -= 1;
  //     } else {
  //       // Remove item from cart if quantity is 0
  //       updatedCart.splice(index, 1);
  //     }
  //     setCart(updatedCart);
  //     sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  //   }
  // };
  // const discountAmount = (discount/ 100);
  const handleRemove = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  };  
  const totalPrice = cart.reduce((total, item) => {
    // if (item.packagename === 'Annual Membership') {
    //   return total +(item.pricePerItem * item.quantity) ; 
    // }
    return total + item.pricePerItem ;
  }, 0);

const discountAmount = (discount / 100) * totalPrice;

// Apply discount
const finalPrice = totalPrice - discountAmount;


// const discountAmount = (discount/ 100) * totalPrice;
  useEffect(() => {
    const fetchUserData = async () => {
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
      }
    };
  
    fetchUserData();
  }, []);

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      console.log("Proceeding to checkout...");
      
      if (cart.length !== 1) {
        toast.error('You must have exactly one item in your cart to proceed to checkout.');
        return;
      }
      const isAnnualMembership = cart.some(item => item.packagename === 'Annual Membership');
      const purchaseData = cart.map(item => ({
        price: finalPrice,
        id: item.id,
        Coupon_code:couponCode
        // years: isAnnualMembership ? item.quantity : undefined
      }));
      
      await parchacemembership(purchaseData);
      console.log('Checkout successful!');
      // navigate("/Paidcontent");

      sessionStorage.removeItem('cart');    
    } catch (error) {
      console.error('Error during checkout:', error);
    }finally {
      setLoading(false); 
    }
  };
  
  const handleLogout = async () => {
    try {
      await getlogout();
      window.location.href = 'login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleApplyCoupon = async () => {
    try {
      let coupon_code = couponCode;
      const response = await postCoupon({  coupon_code });
      if (response && response.discount_percentage) {
        setDiscount(response.discount_percentage);
        // toast.success('Discount applied!');
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
    }
  };

  // const isInvalidPrice = Array.isArray(finalPrice) && finalPrice.length > 1;

  // if (isInvalidPrice) {
  //   return <div className="text-red-600">Error</div>;
  // }


  // if (membership==true) {
  //   return <Paidcontent />; 
  // }
  
  const packageItem = cart.find(item => item.packagename === 'Annual Membership' || 'Life Time Membership ');
  const packageName = packageItem ? packageItem.packagename : 'Membership';
  const packagePrice = packageItem ? packageItem.pricePerItem : 0;
  

  return (
    <>
      <Helmet>
        <title>Your Cart - Kahanify</title>
        <meta name="description" content="View and manage your cart on Kahanify. Review your selected and video stories and also read  story memberships, adjust quantities, and proceed to checkout." />
        <meta name="keywords" content="cart, Kahanify, audio and video stories and also read stories, membership, checkout" />
        <meta property="og:title" content="Your Cart - Kahanify" />
        <meta property="og:description" content="View and manage your cart on Kahanify. Review your selected audio and video stories and also read story memberships, adjust quantities, and proceed to checkout." />        
        <meta property="og:url" content="https://Kahanify.com/cart" />
        <meta name="twitter:title" content="Your Cart - Kahanify" />
        <meta name="twitter:description" content="View and manage your cart on Kahanify. Review your selected audio and video stories and also read story memberships, adjust quantities, and proceed to checkout." />
       
      </Helmet>

      <div className="container mx-auto px-3 sm:px-3 md:px-16 py-8">
        <h2 className="text-2xl font-bold text-center mb-4">Get Access to All The Audio Stories on Kahanify</h2>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 p-3 flex flex-col">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">
                    <button className='bg-gray-100 px-5 py-2 border-0 text-sm'>Product</button>
                  </th>
                  <th className="text-right pl-0 md:pl-0 sm:pl-14">
                    <button className='bg-gray-100 px-5 py-2 sm:text-end border-0 text-sm'>Total</button>
                  </th>
                </tr>
              </thead>
              <tbody className='border-y'>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2">
                      <div className="flex items-center">
                        <img 
                        // src={item.image} 
        src={`https://admin.kahanify.com/storage/app/public/${item.image}`}
                        
                        alt="Product Image" className="w-20 h-20 mr-4" />
                        <div>
                          <p className="text-lg font-medium">{item.packagename}</p>
                          <p className="text-gray-500 pb-3">Rs {item.pricePerItem}</p>
                          <div className="items-center">
                            {/* {item.packagename === 'Annual Membership' && (
                              <div className='flex pb-4'>
                                <button className='border px-3 py-1' onClick={() => handleDecrement(index)}>-</button>
                                <button className='mx-2'>{item.quantity}</button>
                                <button className='border px-3 py-1' onClick={() => handleIncrement(index)}>+</button>
                              </div>
                            )} */}
                            <p className='text-sm cursor-pointer hover:underline hover:text-pink-600' onClick={() => handleRemove(index)}>Remove items</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right flex justify-end item-top font-bold py-2">
                      {/* Rs {item.pricePerItem * item.quantity} */}
  {/* Rs {item.packagename === 'Annual Membership' ? (item.pricePerItem * item.quantity) : item.pricePerItem} */}
Rs{ item.pricePerItem}
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full md:w-1/3 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-end font-bold mb-2">Cart Totals</h3>
              <div className="border-y p-5 flex justify-between">
                {/* <p className="text-gray-500">Add a coupon</p> */}
                {/* <button className="text-gray-500" onClick={handleApplyCoupon}>Add a coupon</button> */}
                {couponCode ? (
        <button className="bg-blue-500 p-2 rounded text-white hover:bg-pink-500" onClick={handleApplyCoupon}>
          Apply coupon
        </button>
      ) : (
        <p className="text-gray-500">Add a coupon</p>
      )}

                <input type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                className="border-b border-gray-500 p-1 " />
              </div>
              <div className="border-y p-5 flex justify-between">
                <p className="text-gray-500">Subtotal</p>
                <strong className='text-black font-bold'>
      Rs {cart.length === 1 ? finalPrice : 'ERROR'}
 </strong>
              </div>
              <div className="p-5 flex justify-between font-bold">
                <p>Total</p>
                <strong className='text-black font-bold'>
   Rs {cart.length === 1 ? finalPrice : 'ERROR'}
    </strong>
              </div>
            </div>
            <button 
              onClick={handleCheckOut}
              className="bg-blue-500 hover:bg-pink-600 text-white flex items-center justify-center font-bold py-2 px-4 rounded mt-4">
              {
            loading ?<img src={load} alt="load" className='h-6 w-6' />  : 'Proceed to Checkout'
          }
            </button>
          </div>
        </div>

        <div className="mt-8">
          <p className=" bg-blue-100  p-4 border-l-4 border-green-500">
            You are logged in as <span className='pl-1 font-bold'>{name}</span>. If you would like to use a different account for this membership,
            <button onClick={handleLogout} className="block bg-transparent hover:text-pink-600 hover:underline border-none"> log out now.</button>
            
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold pb-3">Membership Details</h3>
          {/* <p className="text-gray-500 pb-2">This is an {packageName} package.</p>
          <p className="text-gray-500 pb-2">The price for membership is PKR{packagePrice} now.</p>
          {packageName === 'Annual Membership' && (
            <p className="text-gray-500 pb-2">Membership expires after 1 year (365 Days)</p>
          )}
 */}
   <ul className="list-disc list-inside space-y-2">
            {(cart.length && cart[0].description ? cart[0].description : '').split('\n')
              .filter(item => item.trim() !== '') // Filter out empty lines
              .map((item, index) => (
                <li key={index}>{item}</li>
              ))}
          </ul>


          {/* <p className="text-gray-500 pb-2">Membership expires after 1 year (365 Days)</p> */}
        </div>
      </div>
    </>
  );
}

export default Cart;




// const handleCheckOut = async () => {
//   setLoading(true);
//   try {
//     console.log("Proceeding to checkout...");
    
//     if (cart.length !== 1) {
//       toast.error('You must have exactly one item in your cart to proceed to checkout.');
//       return;
//     }
    
//     // Extract the `id` from the cart item
//     const item = cart[0]; // Assuming there's only one item in the cart
//     const isAnnualMembership = item.packagename === 'Annual Membership';
//     const purchaseData = {
//       id: item.id,
//       price: totalPrice,
//       years: isAnnualMembership ? item.quantity : undefined
//     };
    
//     await parchacemembership(purchaseData);
//     console.log('Checkout successful!');
//     navigate("/Paidcontent"); // Uncomment if you want to navigate after success
//     sessionStorage.removeItem('cart');
//   } catch (error) {
//     console.error('Error during checkout:', error);
//   } finally {
//     setLoading(false);
//   }
// };


