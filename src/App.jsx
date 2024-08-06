import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/home/Home';
import SignUp from './component/SignUp/SignUp';
import Login from './component/Login/Login';
import ContactUs from './component/ContactUs/ContactUs';
import Package from './component/Packages/Package.jsx';
import Layout from './component/Layout';
import Cart from './component/cart/Cart.jsx';
import Profile from './component/Profile/Profile.jsx';
import FreeStory from './component/FreeStory/FreeStory.jsx';
import Paidcontent from './component/Paidcontent/Paidcontent.jsx';
import SearchBar from './component/SearchBar/SearchBar.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="Package" element={<Package />} />
          <Route path="cart" element={<Cart/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="Paidcontent" element={<Paidcontent/>} />
          <Route path="SearchBar" element={<SearchBar/>} />
        </Route>
      
        <Route path="FreeStory" element={<FreeStory/>} />
      </Routes>
      
    </Router>
  );
}

export default App;
