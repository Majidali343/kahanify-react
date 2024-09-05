import React, { useEffect, useState } from 'react';
import { detail } from '../Service/api';
import Loader from '../loader/Loader';
import { Helmet } from 'react-helmet';
function Order() {
  const [orderData, setOrderData] = useState(null);  
  const [status, setStatus] = useState(null);
  const [name, setName] = useState(null);
  const [year, setYear] = useState(null);
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
    setLoading(true);
      try {
        const response = await detail();
        console.log(response);
        if (response.data) {
          setOrderData(response.data.order_id);
          setStatus(response.data.status);
          setName(response.data.name);
          setYear(response.data.purchase_date);
          setAmount(response.data.price);
        } else {
          setOrderData(null); 
        }
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }finally{
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-4 md:p-14 mx-2 md:mx-52 min-h-[88vh]">


<Helmet>
        <title>Order Details | Kahanify</title>
        <meta name="description" content="View your order details on Kahanify. Check your order ID, status, package name, purchase date, and amount." />
        <link rel="canonical" href="http://kahanify.com/Order" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Order Details | Kahanify" />
        <meta property="og:description" content="View your order details on Kahanify. Check your order ID, status, package name, purchase date, and amount." />
        <meta property="og:url" content="http://kahanify.com/Order" />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Kahanify" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Order Details | Kahanify" />
        <meta name="twitter:description" content="View your order details on Kahanify. Check your order ID, status, package name, purchase date, and amount." />
        <meta name="twitter:site" content="@Kahanify" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Order",
              "name": "Order Details",
              "description": "Details of an order placed on Kahanify.",
              "orderNumber": "${orderData}",
              "orderStatus": "${status}",
              "orderedItem": {
                "@type": "Product",
                "name": "${name}"
              },
              "price": "${amount}",
              "orderDate": "${year}",
              "url": "http://kahanify.com/Order",
            }
          `}
        </script>
      </Helmet>
      <div>
        <h1 className="font-bold text-xl border-b-2 pb-3">
          <span className="border-b-2 border-b-blue-500 py-3">My Ord</span>er Detail
        </h1>
      </div>
      {loading ?
      

      <div className="flex justify-center items-center min-h-[85vh] w-full">
    
    <Loader />
    </div>
     
   : (
      <div className="p-4 mt-6 bg-blue-100">
        {orderData ? (
          <table className="w-full border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 font-bold">Order Id</td>
                <td className="border border-gray-300 p-2">{orderData}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-bold">Status</td>
                <td className="border border-gray-300 p-2">{status}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-bold">Package Name</td>
                <td className="border border-gray-300 p-2">{name}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-bold">Purchase Date</td>
                <td className="border border-gray-300 p-2">{year}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-bold">Amount</td>
                <td className="border border-gray-300 p-2">{amount}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className='min-h-[98%] '>

          <p className="text-center text-red-500 font-bold">You have no orders.</p>
          </div>
        )}
      </div>
)}
</div>
  );
}

export default Order;
