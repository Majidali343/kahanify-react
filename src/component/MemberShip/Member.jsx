import React, { useEffect, useState } from 'react';
import { detail } from '../Service/api';
import Loader from '../loader/Loader';

function Member() {
  const [memberData, setMemberData] = useState(null); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await detail();
        console.log(response);
        if (response.data) {
          setMemberData(response.data);
        } else {
          setMemberData(null); 
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }finally {
        setLoading(false); 
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-4 md:p-14 mx-2 md:mx-30 lg:mx-44 xl:mx-52 min-h-[80vh]">
      <div>
        <h1 className="font-bold text-xl border-b-2 pb-3">
          <span className="border-b-2 border-b-blue-500 py-3">My Memb</span>
          ership Detail
        </h1>
      </div>
     
    {loading ?
      

      <div className="flex justify-center items-center min-h-[85vh] w-full">
    
    <Loader />
    </div>
     
   : (
      <div className="p-1 md:p-4 mt-6 bg-blue-100">
        {memberData ? (
          <table className="w-full border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300  p-1 md:p-2 font-bold">Member Id</td>
                <td className="border border-gray-300 p-1 md:p-2">{memberData.user_id}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 md:p-2 font-bold">Membership Validity</td>
                <td className="border border-gray-300 p-1 md:p-2">{memberData.membershipvalidity}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 md:p-2 font-bold">Package Name</td>
                <td className="border border-gray-300 p-1 md:p-2">{memberData.name}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-1 md:p-2 font-bold">Created At</td>
                <td className="border border-gray-300 p-1 md:p-2">{memberData.created_at}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className='min-h-[98%]'>
            <p className="text-center text-red-500 font-bold">You have no Membership.</p>
          </div>
        )}
      </div>
        )}
            </div>
  );
}

export default Member;
