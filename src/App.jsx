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
import ForgotPassword from './component/ResetPassword/ForgotPassword.jsx';
import ResetPassword from './component/ResetPassword/ResetPassword.jsx';
import Privacy from './component/Privacy Policy/Privacy.jsx';
import Conditions from './component/Conditions/Conditions.jsx';
import Refund from './component/Refund policy/Refund.jsx';
import FAQs from './component/FAQs/FAQs.jsx';

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
          <Route path="Privacy" element={<Privacy/>} />
          <Route path="Conditions" element={<Conditions/>} />
          <Route path="ForgotPassword" element={<ForgotPassword/>} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="Refund" element={<Refund />} />
          <Route path="FAQs" element={<FAQs />} />
          
        </Route>
      
        <Route path="FreeStory" element={<FreeStory/>} />
      </Routes>
      
    </Router>
  );
}

export default App;
