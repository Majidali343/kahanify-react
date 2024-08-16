import React, { useState, useRef , useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { asset34, asset35, asset36 } from '../imageLoader';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { getCurrentUser, changepassword, updateimage, userprofile, sendReveiw,getlogout } from '../Service/api';  

function Profile() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [current_password, setCurrentPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setRetypeNewPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [profileimage, setProfileImage] = useState(asset34);
  const [error, setError] = useState('');  
  const [success, setSuccess] = useState(''); 
  const [imageFile, setImageFile] = useState(null);
  
  const fileInputRef = useRef(null);

  
  const handlePasswordChange = async (event) => {
    event.preventDefault();
    if (new_password !== confirm_password) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    
    try {
      await changepassword({
        new_password,
        current_password
        
      });
      setSuccess('Password changed successfully');
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

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
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userprofile();
        console.log(response);
  
        if (response && response.user) {
          const user = response.user;
          console.log(user);
          if (user.profileimage) {
            console.log(user.profileimage);
            // setProfileImage(user.profileimage);    
        setProfileImage(`https://kahaniapi.realtechcrm.online/storage/app/public/${user.profileimage}`);
       }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [profileimage]); 
  



  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };

 
 
 
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
  
      const formData = new FormData();
      formData.append('profileimage', file); 
  
      try {
        await updateimage(formData);
        setSuccess('Image updated successfully');
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    }
  };

 

  const handleLogout = async () => {
    try {
      const response = await getlogout();
      console.log(response); 
  window.location.href = 'login'; 
     
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
 

  
  const handleExperice = async (e) => {
  try {
    
    await sendReveiw(experience);
    setExperience(''); 
    setSuccess('Thanks for share Experience');
  } catch (error) {
    console.error('Error posting reviw:', error);
  }

}



  return (
    <>
      <Helmet>
        <title>Profile Page - Kahanify</title>
        <meta name="description" content="Manage your profile, change your password, and share your experience on Kahanify. Update your profile picture, contact information, and more." />
        <meta name="keywords" content="profile, update profile, change password, Kahanify, user experience" />
        <meta property="og:title" content="Profile Page - Kahanify" />
        <meta property="og:description" content="Manage your profile, change your password, and share your experience on Kahanify. Update your profile picture, contact information, and more." />
        <meta property="og:image" content={profileimage} />
        <meta property="og:url" content="https://Kahanify.com/profile" />
        <meta property="og:type" content="profile" />
      </Helmet>
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row">
          <div className="flex-none w-full md:w-3/12 mb-4 md:mb-0">
            <div className="relative w-full h-48 flex items-center justify-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {/* <img src={`https://kahaniapi.realtechcrm.online/storage/app/public/${profileimage}`} alt="Profile" className="w-full h-full object-cover" /> */}
                <img src={profileimage} alt="Profile" className="w-full h-full object-cover" />
   
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 py-1 flex items-center justify-center">
                  <button onClick={handleCameraClick}>
                    <img className='w-4 h-4' src={asset36} alt="camera icon" />
                  </button>
                </div>
              </div>
            </div>
            <input
              type="file"
              required
              name="profileimages"
              accept=".png, .jpg, .jpeg"
              onChange={handleImageChange}
              style={{ display: 'none' }}  
              ref={fileInputRef} 
             />
          </div>
          <div className="flex-1">
            <div>
              <h1 className='font-bold text-xl border-b-2 py-3'>
                <span className='border-b-2 border-b-blue-500 py-3'> My p</span>rofile
              </h1>
            </div>
            <div className="grid p-4 mt-6 bg-blue-100 grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder='First Name'
                  value={name}
                  readOnly
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder='Last Name'
                  value={lastName}
                  readOnly
                  onChange={(e) => setLastName(e.target.value)}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg pt-4 font-bold">Change Password</h3>
              <div className='p-4 bg-blue-100'>
              
              <form onSubmit={handlePasswordChange}>
              <div className="grid  grid-cols-1 md:grid-cols-2 gap-4 mt-2">
           
              <div>
                  <label htmlFor="newPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={current_password}
                    placeholder='Enter password'
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                  
                <div>
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={new_password}
                    placeholder='Enter password'
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div>
                 
                  <label htmlFor="retypeNewPassword">Re-type New Password</label>
                  <input
                    type="password"
                    id="retypeNewPassword"
                    placeholder='Confirm password'
                    value={confirm_password}
                    onChange={(e) => setRetypeNewPassword(e.target.value)}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
              <div className='flex flex-col md:flex-row justify-end mt-4'>
              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-pink-700 text-white font-bold h-19 px-4 rounded mb-4 md:mb-0"
                >
                  Save Changes
                </button>
               
             </div>
           
              </div>
              </form>
              </div>
              
              {error && <p className="text-red-500 font-bold mt-2">{error}</p>}
                {success && <p className="text-green-500 font-bold mt-2">{success}</p>}

<div className='flex flex-col md:flex-row justify-start mt-4'>
                <button onClick={handleLogout} className='rounded-xl flex justify-center px-3 py-2 bg-gray-300'>
                  <img className='w-3 self-center mx-1' src={asset35} alt="Logout" />
                  Logout
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold">Share your experience with Kahanify</h3>
              <textarea
                className="border border-gray-300 p-2 w-full h-24"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
              <div className='flex justify-end'> 
                <button 
                onClick={handleExperice}
                className="bg-blue-600 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mt-2">
                  Submit
                </button> 
                <br />
              
              </div>
              {success && <p className="text-green-500 font-bold mt-2">{success}</p>}
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

