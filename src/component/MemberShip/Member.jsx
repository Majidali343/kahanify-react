import React, { useEffect, useState } from 'react';
import { detail } from '../Service/api';

function Member() {
  const [member, setMember] = useState(); 
  const [validity, setValidity] = useState(); 
  const [name, setName] = useState(); 
  const [created, setCreated] = useState(); 
  

 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await detail();
        console.log(response);
        setMember(response.data.user_id);
        setValidity(response.data.membershipvalidity); 
        setName(response.data.name); 
        setCreated (response.data.created_at);

      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
    <div  className="p-4 md:p-14 mx-2 md:mx-52 min-h-[98vh]">
      <div className="flex-1">
        <div>
          <h1 className="font-bold text-xl border-b-2 pb-3">
            <span className="border-b-2 border-b-blue-500 py-3">My Memb</span>ership Detail
          </h1>
        </div>
        <div className="grid p-4 mt-6 bg-blue-100 grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label htmlFor="Order_ID">Member Id</label>
            <input
              type="text"
              id="User_ID"
              value={member}
              readOnly
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="status">Membership Validity</label>
            <input
              type="text"
              id="membershipvalidity"
              value={validity}
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
          <label htmlFor="years">created_at</label>
          <input
            type="text"
            id="Years"
            value={created}
            readOnly
            className="border border-gray-300 p-2 w-full"
          />
        </div>
      </div>
    </div>
  </>

  )
}

export default Member
