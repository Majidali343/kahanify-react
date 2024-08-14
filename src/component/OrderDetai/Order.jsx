import React, { useEffect, useState } from 'react';
import { detail } from '../Service/api';

function Order() {
  const [orderData, setOrderData] = useState();
  const [status, setStatus] = useState(); 
  const [name, setName] = useState(); 
  const [year, setYear] = useState(); 
  const [amount, setAmount] = useState(); 
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await detail();
        console.log(response);
        setOrderData(response.data.order_id); 
        setStatus(response.data.status);
        setName(response.data.name); 
        setYear(response.data.years); 
        setAmount(response.data.amount);        
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchUserData();
  }, []);

  

  return (
    <>
      <div  className="p-4 md:p-14 mx-2 md:mx-52">
        <div className="flex-1">
          <div>
            <h1 className="font-bold text-xl border-b-2 pb-3">
              <span className="border-b-2 border-b-blue-500 py-3">My Ord</span>er Detail
            </h1>
          </div>
          <div className="grid p-4 mt-6 bg-blue-100 grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label htmlFor="Order_ID">Order Id</label>
              <input
                type="text"
                id="Order_ID"
                value={orderData}
                readOnly
                className="border border-gray-300 p-2 w-full"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                id="status"
                value={status}
                readOnly
                className="border border-gray-300 p-2 w-full"
              />
            </div>
          </div>
        </div>

        <div className="grid p-4 mt-6 bg-blue-100 grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="name">Package name</label>
            <input
              type="text"
              id="Package_name"
              value={name}
              readOnly
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="years">Years</label>
            <input
              type="text"
              id="Years"
              value={year}
              readOnly
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              id="Amount"
              value={amount}
              readOnly
              className="border border-gray-300 p-2 w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
