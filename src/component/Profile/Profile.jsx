import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { asset34, asset35, asset36 } from '../imageLoader';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

function Profile() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypeNewPassword, setRetypeNewPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [profileImage, setProfileImage] = useState(asset34);
  const [error, setError] = useState('');

  const fileInputRef = useRef(null);


  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); 
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    if (newPassword !== retypeNewPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };


  return (
    <>
      <Helmet>
        <title>Profile Page - Kahanify</title>
        <meta name="description" content="Manage your profile, change your password, and share your experience on Kahanify. Update your profile picture, contact information, and more." />
        <meta name="keywords" content="profile, update profile, change password, Kahanify, user experience" />
        <meta property="og:title" content="Profile Page - Kahanify" />
        <meta property="og:description" content="Manage your profile, change your password, and share your experience on Kahanify. Update your profile picture, contact information, and more." />
        <meta property="og:image" content={profileImage} />
        <meta property="og:url" content="https://Kahanify.com/profile" />
        <meta property="og:type" content="profile" />
      </Helmet>
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row">
          <div className="flex-none w-full md:w-3/12 mb-4 md:mb-0">
            <div className="relative w-full h-48 flex items-center justify-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 py-1 flex items-center justify-center">
                  <button onClick={handleCameraClick}>
                    <img className='w-4 h-4' src={asset36} alt="camera icon" />
                  </button>
                </div>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }} 
            />
          </div>
          <div className="flex-1">
            <div>
              <h1 className='font-bold text-xl border-b-2 py-3'>
                <span className='border-b-2 border-b-blue-500 py-3'> My p</span>rofile
              </h1>
            </div>
            <div className="grid p-4 mt-6 bg-blue-100 grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder='First Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg pt-4 font-bold">Change Password</h3>
              <div className="grid p-4 bg-blue-100 grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
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
                    value={retypeNewPassword}
                    onChange={(e) => setRetypeNewPassword(e.target.value)}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <div className='flex flex-col md:flex-row justify-between mt-4'>
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mb-4 md:mb-0"
                >
                  Save Changes
                </button>
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
                <button className="bg-blue-600 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded mt-2">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
