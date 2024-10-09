import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import axios from 'axios';
import { asset34, asset35, asset36 } from '../imageLoader';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import Cookies from 'js-cookie';
import { getCurrentUser, updateimage, userprofile, sendReveiw, getlogout, updatephone } from '../Service/api';
export const API_URL = import.meta.env.VITE_API_URL;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { useForm } from 'react-hook-form';

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
const [email, setEmail]= useState('')
const fileInputRef = useRef(null);
const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [old_phone , setOldPhone]= useState('');
  const [new_phone , setNewPhone] = useState("");



  const handlePasswordChange = async (event) => {
    event.preventDefault();
     const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (new_password.length < 8 || new_password.length > 20) {
      toast.error('Password must be between 8 and 20 characters long.')
      return ;
    }
    if (!passwordRegex.test(new_password)) {
      toast.error('Password must include at least 1 uppercase letter, 1 lowercase letter, and 1 number.');
      return ;
    }
    if (new_password !== confirm_password) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    console.log(new_password, "jhjehfj")
    console.log(current_password, "ccccccccc")

    const token = Cookies.get('token');

    try {


      const response = await axios.post(
        `${API_URL}/updatepassword`,
        {
          new_password,
          current_password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      );

      toast.success(response.data.message)
      handleLogout();
    } catch (error) {

         toast.error(error.response.data.message);
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
setEmail(user.email);
          if (user.username) {
            console.log(user.username);
            setName(user.username);
          }
          
          if (user.phone) {
            console.log(user.phone);
            setOldPhone(user.phone);
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
            setProfileImage(`https://kahanifylaravel.kahanify.com/storage/app/public/${user.profileimage}`);
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
        // setSuccess('Image updated successfully');
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    }
      
    
  };

  const handlePhoneChange = async (e) => {
  
    console.log(new_phone)
  
    const phoneObject = {
      phone: new_phone
    };

try {
  const token = Cookies.get('token');
  console.log(token);
  console.log('hello profile phone no');
  
  console.log( phoneObject);

  const response = await axios.post(
    `${API_URL}/updateProfile`, phoneObject ,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  console.log(response);
  console.log(response.data.user.phone );
  console.log("This is response");
  toast.success("phone no update successful!");

  return response.data;
} catch (error) {
  console.error('Error updating phone no', error);
 
  throw error;
}


}

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
      toast.success('Thanks for sharing your valuable experience');
      // setSuccess('Thanks for sharing your valuable experience');
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
                {/* <img src={`https://kahanifylaravel.kahanify.com/storage/app/public/${profileimage}`} alt="Profile" className="w-full h-full object-cover" /> */}
                <img src={profileimage} alt="Profile" className="w-full h-full object-cover" />

                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 py-1 flex items-center justify-center">
                  <button onClick={handleCameraClick}>
                    <img className='w-6 h-6' src={asset36} alt="camera icon" />
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
                  className="border hover:text-gray-500 border-gray-300 p-2 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">Email</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder='Email'
                  value={email}
                  readOnly
                  onChange={(e) => setLastName(e.target.value)}
                  className="border border-gray-300 hover:text-gray-500 p-2 w-full"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg pt-4 font-bold">Change Phone no</h3>
              <div className='p-4 bg-blue-100'>

                  <div className="grid  grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="relative">
              <label htmlFor="newPassword">Phone no</label>
              <input
                type='text'
                id="new-phone"
                value={old_phone}
                placeholder='Enter new phone no'
                className="border border-gray-300 p-2 w-full"
              />
            </div>

            <div className="relative">
              <label htmlFor="newPassword">New Phone no</label>
              <input
                type='text'
                id="new-phone"
                value={new_phone}
                placeholder='Enter new phone no'
                onChange={(e) => setNewPhone(e.target.value)}
                className="border border-gray-300 p-2 w-full"
              />
            </div>
  
                    <div className='flex flex-col md:flex-row justify-start '>
                      <button
                        onClick={handlePhoneChange}
                        className="bg-blue-500 hover:bg-pink-700 text-white p-3 font-bold h-19 px-4 rounded mb-4 md:mb-0"
                      >
                        Save Phone no
                      </button>

                    </div>

                  </div>
              </div>
              </div>




            <div className="mt-4">
              <h3 className="text-lg pt-4 font-bold">Change Password</h3>
              <div className='p-4 bg-blue-100'>

                <form onSubmit={handlePasswordChange}>
                  <div className="grid  grid-cols-1 md:grid-cols-2 gap-4 mt-2">

                    {/* <div>
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

                      <label htmlFor="Confirm password">Re-type New Password</label>
                      <input
                        type="password"
                        id="Confirm password"
                        placeholder='Confirm password'
                        value={confirm_password}
                        onChange={(e) => setRetypeNewPassword(e.target.value)}
                        className="border border-gray-300 p-2 w-full"
                      />
                    </div> */}
                 
                 <div className="relative">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                id="currentPassword"
                value={current_password}
                placeholder='Enter password'
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border border-gray-300 p-2 w-full"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <FontAwesomeIcon icon={showCurrentPassword ? faEye : faEyeSlash} className="h-5 w-5 pt-6 text-gray-500" />
              </button>
            </div>

            <div className="relative">
              <label htmlFor="newPassword">New Password</label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                value={new_password}
                placeholder='Enter password'
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-300 p-2 w-full"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} className="h-5 w-5 pt-6 text-gray-500" />
              </button>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword">Re-type New Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder='Confirm password'
                value={confirm_password}
                onChange={(e) => setRetypeNewPassword(e.target.value)}
                className="border border-gray-300 p-2 w-full"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} className="h-5 pt-6 w-5 text-gray-500" />
              </button>
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
              {/* {success && <p className="text-green-500 font-bold mt-2">{success}</p>} */}

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
               maxLength="100"
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

