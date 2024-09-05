import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Typing from "react-typing-effect";
import "../Css/privacy.css";
import { Link } from "react-router-dom";

function Refund() {
  const [typingComplete, setTypingComplete] = useState(false);

  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

  useEffect(() => {
    if (typingComplete) {
      const timer = setTimeout(() => setTypingComplete(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [typingComplete]);

  return (
    <div className="bg-[#18003c] text-white">
       <Helmet>
        <title>Refund Policy - Kahanify</title>
        <meta name="description" content="Read the Refund Policy for Kahanify, outlining our non-refundable membership fees, subscription management, billing details, and more. Learn about our guidelines for refunds and cancellations." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.kahanify.com/Refund" />
        <meta property="og:title" content="Refund Policy - Kahanify" />
        <meta property="og:description" content="Read the Refund Policy for Kahanify, outlining our non-refundable membership fees, subscription management, billing details, and more. Learn about our guidelines for refunds and cancellations." />
        <meta property="og:url" content="https://www.kahanify.com/Refund" />
      </Helmet>

      <div className="p-4 sm:p-6 md:p-8 lg:p-6 xl:p-6">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold">
          Refund Policy for
            <Typing
              className={`px-2 text-[#ff0087] ${
                typingComplete ? "typing-complete" : "typing-active"
              }`}
              text={[" Kahanify.com"]}
              speed={100}
              eraseSpeed={50}
              typingDelay={1000}
              eraseDelay={5000}
              onFinishedTyping={handleTypingComplete}
            />
          </h1>
        </div>
      </div>

      <div className="px-4  sm:px-6 md:px-8 lg:px-10 xl:px-8 mx-2 sm:mx-4 md:mx-6 lg:mx-6 xl:mx-6">
        <div className="py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12">
          <h2 className="font-bold text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6">
            Last Updated: [01/12/2023]
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
          This Refund Policy outlines our guidelines regarding the refund of membership fees paid for access to audio stories on our platform. Please read this policy carefully before subscribing to our services.
          </p>
        </div>

        <div className="border-2 border-transparent hover:border-t-[#ff0087] hover:border-b-[#ff0087] transition-all duration-300 mb-3">
          <h1 className="text-2xl font-semibold px-4  cursor-pointer">
            1. No Refund Policy:
          </h1>
          <div className="p-4 ">
            <h2 className="font-bold my-4"> a. Membership Fees:</h2>
          <p>
          All membership fees paid to access audio stories on Kahanify.com are non-refundable.
          </p>
          </div>
        </div>

        <div className="border-2 border-transparent hover:border-t-[#ff0087] hover:border-b-[#ff0087] transition-all duration-300 mb-8">
          <h1 className="text-2xl font-semibold px-4 py-2 cursor-pointer">
            2. Subscription Duration:
          </h1>
          <div className="p-4 ">
            <h2  className="font-bold my-4">  a. Cancellation During Subscription Period:</h2>
          <p>
          Users have the option to cancel their subscription at any time during the subscription period. However, no refunds will be provided for the remaining duration of the subscription.  </p>
          </div>
        </div>


        <div className="border-2 border-transparent hover:border-t-[#ff0087] hover:border-b-[#ff0087] transition-all duration-300 mb-3">
          <h1 className="text-2xl font-semibold px-4  cursor-pointer">
            3. Billing and Automatic Renewal:
          </h1>
          <div className="p-4 ">
            <h2 className="font-bold my-4">  a. Automatic Renewal:</h2>
          <p>
          Memberships are set to automatically renew to ensure uninterrupted access to audio stories. Users are responsible for managing their subscription settings to avoid automatic renewal if they do not wish to continue with the service. </p>
          </div>

          <div className="px-4 ">
            <h2 className="font-bold my-4"> b. Billing Disputes:</h2>
          <p>In the event of a billing dispute or unauthorized charges, users are encouraged to contact our customer support at [<span className="text-[#ff0087]"><Link to="mailto:contact@kahanify.com">contact@kahanify.com</Link></span>]. to seek resolution. However, this does not guarantee a refund
             </p>
          </div>
        </div>


        <div className="border-2 border-transparent hover:border-t-[#ff0087] hover:border-b-[#ff0087] transition-all duration-300 mb-3">
          <h1 className="text-2xl font-semibold px-4  cursor-pointer">
            4. Exceptions:
          </h1>
          <div className="p-4 ">
            <h2 className="font-bold my-4"> a. Technical Issues:</h2>
          <p>
          If there are technical issues on our end that prevent users from accessing the subscribed content, we will investigate the matter promptly. In such cases, Kahanify.com may, at its discretion, provide a refund or credit for the affected period.
          </p>
          </div>
        </div>

        <div className="border-2 border-transparent hover:border-t-[#ff0087] hover:border-b-[#ff0087] transition-all duration-300 mb-3">
          <h1 className="text-2xl font-semibold px-4  cursor-pointer">
            5. Contact Us:
          </h1>
          <div className="p-4 ">
          <p>
          If you have any questions or concerns regarding this Refund Policy, please contact us at [ <span  className="text-[#ff0087]"><Link to="mailto:contact@kahanify.com">contact@kahanify.com</Link></span>].</p>
          </div>
        </div>

        <div className="border-2 border-transparent hover:border-t-[#ff0087] hover:border-b-[#ff0087] transition-all duration-300 ">
          <h1 className="text-2xl font-semibold px-4  cursor-pointer">
            6. Changes to Refund Policy:
          </h1>
          <div className="p-4 ">
          <p className=" my-4">
          Kahanify.com reserves the right to modify or update this Refund Policy at any time. Users will be notified of material changes.
          </p>
          <p>
          By subscribing to Kahanify.com and agreeing to these terms, you acknowledge and accept our No Refund Policy for membership fees.
          </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Refund;
