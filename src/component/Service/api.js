import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { logout } from '../store/authSlice';

const handleUnauthenticated = (error) => {
  if(error.response.data.message== "Unauthenticated." )
 { Cookies.remove('userData');
  Cookies.remove('token');
  window.location.href = 'login'; 
}
};

export const API_URL = import.meta.env.VITE_API_URL;
console.log('API_URL:', API_URL);
//////////
export const login = async (data) => {
  try {
    console.log(data)
    const response = await axios.post(`${API_URL}/login`, data);
    if (response.data.token) {
      Cookies.set('token', response.data.token, { expires: data.rememberMe ? 7 : 0.083 });
    }
    toast.success("SignIn successful!");
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
//////////
export const signup = async (data) => {
  try {

    const response = await axios.post(`${API_URL}/register`, data);
    toast.success("Signup successful!");
    return response.data;

  } catch (error) {
    console.error('Error signing up:', error.response.data.errors);
    throw error;
  }
};
////////////
export const getCurrentUser = async () => {
  // const dispatch = useDispatch();

  try {
    const token = Cookies.get('token');
    const response = await axios.get(`${API_URL}/usershow`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error.response.data.message);
    console.error('Error fetching current user:', error);
    handleUnauthenticated(error);
    throw error;
  }
};
///////////////////////////////

export const updatephone = async ( phone) => {
  try {
    const token = Cookies.get('token');
    console.log(token);
    console.log('hello profile phone no');
    console.log( phone);

    const response = await axios.post(
      `${API_URL}/updateProfile`, phone,
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
};
//////////////////////

export const updateimage = async (formData) => {
  try {
    const token = Cookies.get('token');
    console.log(token);
    console.log('hello profile image');
    console.log(formData);

    const response = await axios.post(
      `${API_URL}/updateProfile`,
      formData, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      }
    );
    console.log(response);
    console.log(response.data.user.profileimage );
    console.log("This is response");
    toast.success("Profile image update successful!");

    return response.data;
  } catch (error) {
    console.error('Error updating image', error);
   
    throw error;
  }
};

/////////////////////
export const allStories = async () => {
  try {
    const token = Cookies.get('token');
    const response = await axios.get(`${API_URL}/getkahanis`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Khanifiy:', error);
    handleUnauthenticated(error);

    throw error;
  }
};
/////////////////////
export const favouritestories = async () => {
  try {
    const token = Cookies.get('token');
    const response = await axios.get(`${API_URL}/favouritekahanis`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Khanifiy:', error);
    throw error;
  }
};

////////////////////////////////
export const singleStory = async (id) => {
  try {
    const token = Cookies.get('token');
    const response = await axios.get(`${API_URL}/getsinglekahani/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};
////////////////////////////////
export const userprofile = async () => {
  try {
    const token = Cookies.get('token');
    console.log(token);

    const response = await axios.get(
      `${API_URL}/usershow`,

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error('Error update image', error);
    

    throw error;
  }
};
////////////
// export const parchacemembership = async (memberpackage) => {
//   try {
//     const token = Cookies.get('token');
//     console.log("helllo");
// console.log(memberpackage);


// const data = JSON.stringify(memberpackage);

// const parsedData = JSON.parse(data);

// const firstElement = parsedData[0];

// if(firstElement.years != "undefined"){
//   var years =  firstElement.years;
//   // var price =firstElement.price;
//   var price = 1;

//   console.log(price, years)
//   const response = await axios.post(
//     `${API_URL}/createorder`,
//     {
//        price
//         , years
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'    
//       }
//     }
//   );
//   console.log(response);
//   console.log (response.data.checkout_url);
//   window.location.href = response.data.checkout_url;
// }else{

//   // var Price =firstElement.price;
//   var Price = 1;
  
//   const response = await axios.post(
//     `${API_URL}/createorder`,
//     {
//        Price 
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json'    
//       }
//     }
//   );
//   console.log(response);
//   window.location.href = response.data.checkout_url;
 
// }

    
//   } catch (error) {
//     console.error('Error update image', error);

//     throw error;
//   }
// };
////////////////////////////////

export const parchacemembership = async (memberpackage) => {
    try {
      const token = Cookies.get('token');
      console.log("helllo");
  console.log(memberpackage);
  
  
  const data = JSON.stringify(memberpackage);
  
  const parsedData = JSON.parse(data);
  
  const firstElement = parsedData[0];
  console.log ('nfvnj', firstElement);
    var package_id =  firstElement.id;
  var  price = firstElement.price;
  var  coupon_code = firstElement.Coupon_code;

    console.log('fbvbvhfbvhbehhbchebchebch', package_id , coupon_code,price )
    const response = await axios.post(
      `${API_URL}/createorder`,
      {
  package_id,
  price,
  coupon_code,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'    
        }
      }
    );
    console.log(response.data);
    console.log (response.data.checkout_url);
    window.location.href = response.data.checkout_url;
  
  
      
    } catch (error) {
      console.error('Error update image', error);
  
      throw error;
    }
  };
  


///////////////////////
export const famousStories = async () => {
  try {
    const response = await axios.get(`${API_URL}/getfamouskahanis`, {
   
    });
    console.log('Famous' , response)
    return response.data;
  } catch (error) {
    console.error('Error fetching famous kahanis:', error);
    throw error;
  }
};
/////////////////////

export const postrating = async (rate) => {
  try {
    const token = Cookies.get('token');
    console.log(token);
console.log('Rate')
console.log ( rate)
var kahani_id =  rate.kahani_id;
var rating =rate.rating;
console.log ( rate.kahani_id)
console.log ( rate.rating)

const response = await axios.post(
      `${API_URL}/ratings`,
      {kahani_id,rating
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          
        }
      }
    );
    console.log(response);

    return response.data;
  } catch (error) {

    console.error('Error update image', error);
    throw error;
  }
};
// /////////////////////////
export const sendcomment = async (commentData) => {
  try {
    const token = Cookies.get('token');
    console.log(token);
console.log('comments')
console.log (commentData );
var kahani_id =  commentData.kahani_id;
var comment =commentData.text;
console.log ( commentData.text)
console.log ( commentData.kahani_id)

    const response = await axios.post(
      `${API_URL}/savereview`,
      { kahani_id,comment 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          
        }
      }
    );
    console.log(response);
    toast.success("Comment Added ");

    return response.data;
  } catch (error) {
    console.error('Error sending comment', error);
if(error.response.data.message== "The comment field is required." ){

  toast.error('The comment field is empty.');
}else if (error.response.data.message=="You have already reviewed this kahani.")
{toast.error('You have already commented on this post.');}
else{
  toast.error('Network Error');
}    
    throw error;
  }
};
////////////////////////////////
// here are api code
export const updatecomments = async (id) => {
  try {
    const token = Cookies.get('token');
    console.log(token);

    const response = await axios.get(
      `${API_URL}/kahanireviews/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log("this us j");
   
    console.log(response);

    return response.data;
  } catch (error) {
    console.error('Error updating comments', error);


    throw error;
  }
};
// ////////////////////////////////
export const sendReveiw = async (description) => {
  try {
    const token = Cookies.get('token');
    console.log(token);
console.log('review')
console.log (description)
    const response = await axios.post(
      `${API_URL}/savetestimonials`,
      {description
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          
        }
      }
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error('Error sending comment', error);

    throw error;
  }
};
////////////////////////
export const updateReview = async () => {
  try {
    const token = Cookies.get('token');
    console.log('Token:', token);

    const response = await axios.get(`${API_URL}/gettestimonials`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Response Data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};
////////////////////////////////////
export const detail = async () => {
  try {
    const token = Cookies.get('token');
    console.log('Token:', token);

    const response = await axios.get(`${API_URL}/getmembership`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('This is Response Data:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};
////////////////////
export const veiws = async (id) => {
  try {
    const token = Cookies.get('token');
    console.log('Token:', token);

    const response = await axios.get(`${API_URL}/kahani/addview/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('This is Response Data:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error updating view:', error);
    throw error;
  }
};

export const isfavourite = async (id) => {
  try {
    const token = Cookies.get('token');
    console.log('Token:', token);

    const response = await axios.get(`${API_URL}/isFavourite/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('This is Response Data:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error updating view:', error);
    throw error;
  }
};



////////////////////
export const likekahani = async (id) => {
  try {
    const token = Cookies.get('token');
    console.log('Token:', token);
   var kahani_id = id ;
    const response = await axios.post(`${API_URL}/addFavourite`, {kahani_id} ,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('This is Response Data:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error adding like:', error);
    throw error;
  }
};
//////////////
export const getlogout = async () => {
  try {
    const token = Cookies.get('token');
    const response = await axios.get(`${API_URL}/logout`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    sessionStorage.removeItem('cart'); 
    return response.data;
    
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};
///////////////////
export const Manual = async ( PackageName ,BankName, payment_image , packageid, packagePrice) => {
  try {
    const token = Cookies.get('token');
    console.log('Token:', payment_image);
 const bank_name=BankName;
const package_name=PackageName;
console.log ('Package Name:', package_name);
console.log ('bank_name:', bank_name);
const paidamount= packagePrice;
const package_id= packageid;
console.log('package_id',package_id)
console.log('packagePrice', paidamount)

         const response = await axios.post(`${API_URL}/manual-payment`,{bank_name , package_name, payment_image, package_id, paidamount}  ,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',

      }
    });

    console.log('This is Response  Data of form:', response.data);
    toast.success("Manual Bill Post successful!");
    return response.data;
    
  } catch (error) {
    console.error('Error adding manul:', error);
  
  
    throw error;
  }
};
//////////
export const postCoupon = async ( coupon_code) => {
  try {
    
    const token = Cookies.get('token');
    console.log('Token:', coupon_code);
         const response = await axios.post(`${API_URL}/coupon/discount`,coupon_code
  ,{
      headers: {
        Authorization: `Bearer ${token}`,        
      }
    });

    console.log('This is Response  Coupon:', response.data);
    toast.success("Discound Add!");
    return response.data;
    
  } catch (error) {
    console.error('Error coupen code:', error);
  
  toast.error('Error');
    throw error;
  }
};
///
// export const getdiscount = async () => {
//   try {
//     const token = Cookies.get('token');
//     console.log('Token:', token);

//     const response = await axios.get(`${API_URL}/discount`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     console.log('This is Response Data:', response.data);
//     return response.data;
    
//   } catch (error) {
//     console.error('Error updating review:', error);
//     throw error;
//   }
// };
/////////////////
//////////
export const postReply = async ( commentid  ) => { 
  try {
    const token = Cookies.get('token');
    console.log('Token:', token);
    const comment_id = commentid.comment_id;
    const message = commentid.message;

    
    console.log('Comment Id:', comment_id);
    
    console.log('Message:', message);
    
         const response = await axios.post(`${API_URL}/postreply`,{comment_id , message}  ,{
      headers: {
        Authorization: `Bearer ${token}`,        
      }
    });

    console.log('This is Response  Reply:', response.data);
    toast.success("reply Add!");
    return response.data;
    
  } catch (error) {
    console.error('Error in Reply:', error);
  
  toast.error('Error in reply');
    throw error;
  }
};
// ///////////////////////
export const getPackages = async () => {
  try {
    const token = Cookies.get('token');
    console.log('Token:', token);

    const response = await axios.get(`${API_URL}/getpackage`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('This is Response Packages:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error updating Packages:', error);
    throw error;
  }
};
/////////////////
export const getSinglePackages = async (id) => {
  try {
    const token = Cookies.get('token');
    console.log('Token:', token);

    const response = await axios.get(`${API_URL}/package/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('This is Response  single Packages:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error updating single  Packages:', error);
    throw error;
  }
};
///////////////////////////////
export const getLink = async () => {
  try {
    const token = Cookies.get('token');
    console.log('Token:', token);

    const response = await axios.get(`${API_URL}/youtubevideo`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('This is Response getLink:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error updating getLink:', error);
    throw error;
  }
};
/////////////////
export const getFree = async () => {
  try {
    const token = Cookies.get('token');
    console.log('Token:', token);

    const response = await axios.get(`${API_URL}/freekahani`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('This is Response getFree', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error updating getFree', error);
    throw error;
  }
};
/////////////////
export const getLogo = async () => {
  try {
    const token = Cookies.get('token');
    console.log('Token:', token);

    const response = await axios.get(`${API_URL}/partners`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('This is Response getLogo', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error updating getLogo', error);
    throw error;
  }
};
/////////////////
export const freepackages = async () => {
  try {
   
    const response = await axios.get(`${API_URL}/allpackages`, {
    });

    console.log('This is Response freepackages', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error updating freepackages', error);
    throw error;
  }
};
