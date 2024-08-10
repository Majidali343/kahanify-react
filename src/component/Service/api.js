import axios from 'axios';
import Cookies from 'js-cookie';

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
    return response.data;

  } catch (error) {
    // console.error('Error signing up:', error.response.data.errors.email);
    console.error('Error signing up:', error.response.data.errors);
    throw error;
  }
};
////////////
export const getCurrentUser = async () => {
  try {
    const token = Cookies.get('token');
    const response = await axios.get(`${API_URL}/usershow`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

//////////////////////
export const changepassword = async (new_password, current_password, confirm_password) => {
  try {
    const token = Cookies.get('token');
    console.log(token);
    console.log(new_password, current_password, confirm_password)
    if (confirm_password == new_password) {
      const response = await axios.post(
        `${API_URL}/updatepassword`,
        {
          new_password,
          current_password,
          confirm_password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response);

      return response.data;
    }else{
      console.error("New Password and Conform password does not match ")
    }

  } catch (error) {
    console.error('Error changing password', error);
    throw error;
  }
};
///////////////
export const updateimage = async (profileimage) => {
  try {
    const token = Cookies.get('token');
    console.log(token);
console.log('hello')
console.log (profileimage)
    const response = await axios.post(
      `${API_URL}/updateProfile`,
      {
        profileimage
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
/////////////////////
export const allStories = async () => {
  try {
    const token = Cookies.get('token');
    const response = await axios.get(`${API_URL}/getkahanis`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
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
export const parchacemembership = async (memberpackage) => {
  try {
    const token = Cookies.get('token');
    console.log("helllo");
console.log(memberpackage);


const data = JSON.stringify(memberpackage);

const parsedData = JSON.parse(data);

const firstElement = parsedData[0];

if(firstElement.years){
  var years =  firstElement.years;
  var price =firstElement.price;
  console.log(price)
  const response = await axios.post(
    `${API_URL}/createorder`,
    {
       price , years
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'    
      }
    }
  );
  console.log(response);
  console.log (response.data.checkout_url);
  window.location.href = response.data.checkout_url;
}else{

  var Price =firstElement.price;
  const response = await axios.post(
    `${API_URL}/createorder`,
    {
       Price 
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'    
      }
    }
  );
  console.log(response);
  window.location.href = response.data.checkout_url;
 
}

    
  } catch (error) {
    console.error('Error update image', error);
    throw error;
  }
};
////////////////////////////////
export const famousStories = async () => {
  try {
    const response = await axios.get(`${API_URL}/getfamouskahanis`, {
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching famous kahanis:', error);
    throw error;
  }
};
/////////////////////

export const postrating = async (kahani_id, rating) => {
  try {
    const token = Cookies.get('token');
    console.log(token);
console.log('Rate')
console.log ( kahani_id, rating)
    const response = await axios.post(
      `${API_URL}/ratings`,
      {kahani_id, rating
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