import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './component/home/Home';
import SignUp from './component/SignUp/SignUp';
import Login from './component/Login/Login';
import ContactUs from './component/ContactUs/ContactUs';
import Package from './component/Packages/Package';
import Layout from './component/Layout';
import Cart from './component/cart/Cart';
import Profile from './component/Profile/Profile';
import FreeStory from './component/FreeStory/FreeStory';
import Paidcontent from './component/Paidcontent/Paidcontent';
import ForgotPassword from './component/ResetPassword/ForgotPassword';
import ResetPassword from './component/ResetPassword/ResetPassword';
import Privacy from './component/Privacy Policy/Privacy';
import Conditions from './component/Conditions/Conditions';
import Refund from './component/Refund policy/Refund';
import FAQs from './component/FAQs/FAQs';
import PrivateRoute from './component/PrivateRoute';
import SingleKahani from './component/PaidStories/SingleKahani';
import Order from './component/OrderDetai/Order';
import Member from './component/MemberShip/Member';
import ScrollToTop from './component/ScrollToTop/ScrollToTop';
import Lifetime from './component/Lifemember/Lifetime';
import Yearly from './component/yearly/Yearly';
import MemberRoute from './component/Memberroute'; 

function App() {
  const isAuthenticated = useSelector((state) => state.auth.status);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="Package" element={<PrivateRoute element={<Package />} />} />
          <Route path="cart" element={<PrivateRoute element={<Cart />} />} />
          <Route path="profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="Order" element={<PrivateRoute element={<Order />} />} />
          <Route path="Member" element={<PrivateRoute element={<Member />} />} />
          {/* <Route path="Paidcontent" element={<PrivateRoute element={<Paidcontent />} />} /> */}
          <Route path="Privacy" element={<Privacy />} />
          <Route path="Conditions" element={<Conditions />} />
          <Route path="ForgotPassword" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="Refund" element={<Refund />} />
          <Route path="FAQs" element={<FAQs />} />
          <Route path="Lifetime" element={<Lifetime />} />
          <Route path="Yearly" element={<Yearly/>} />
          <Route path="package/:id" element={<Lifetime />} />
       
          <Route path="Paidcontent" element={<MemberRoute component={Paidcontent} />} />
        </Route>

        <Route path="kahani/:id" element={<MemberRoute component={SingleKahani} />} />
        {/* <Route path="kahani/:id" element={<SingleKahani />} /> */}
        <Route path="FreeStory" element={<FreeStory />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
