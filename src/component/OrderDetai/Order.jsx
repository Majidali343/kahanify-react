import React, { useEffect, useState } from 'react';
import { detail } from '../Service/api';
import Loader from '../loader/Loader';

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
          setYear(response.data.years);
          setAmount(response.data.amount);
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
    <div className="p-4 md:p-14 mx-2 md:mx-52 min-h-[98vh]">
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
                <td className="border border-gray-300 p-2 font-bold">Years</td>
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
