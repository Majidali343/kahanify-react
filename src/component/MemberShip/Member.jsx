import React, { useEffect, useState } from 'react';
import { detail } from '../Service/api';
import Loader from '../loader/Loader';
import { Helmet } from 'react-helmet';
function Member() {
  const [memberData, setMemberData] = useState(null); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await detail();
        console.log( 'vhcvdhch',response);
        if (response.data) {
if(response.data.status ==  "completed"){
  setMemberData(response.data);
console.log ("statue", response.data.status)
}

// setMemberData(response.data);

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
  
  <Helmet>
        <title>Membership Details | Kahanify</title>
        <meta name="description" content="View your membership details on Kahanify. Check your membership ID, validity, package name, and creation date." />
        <link rel="canonical" href="http://kahanify.com/Member" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Membership Details | Kahanify" />
        <meta property="og:description" content="View your membership details on Kahanify. Check your membership ID, validity, package name, and creation date." />
        <meta property="og:url" content="http://kahanify.com/Member" />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Kahanify" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kahanify Member",
              "description": "Membership details for Kahanify users.",
              "url": "http://kahanify.com/Member"
            }
          `}
        </script>
      </Helmet>
  
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
