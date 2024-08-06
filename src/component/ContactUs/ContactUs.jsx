import React from 'react';
import { Link } from 'react-router-dom'; 
import { asset28, asset29, asset30  } from '../imageLoader';
import '../Css/contact.css';
import { Helmet } from 'react-helmet';
function ContactUs() {
  return (
    <>
    <Helmet>
        <title>Contact Us - Kahanify</title>
        <meta name="description" content="Get in touch with Kahanify's support team. We are here to assist you with any queries you may have. Contact us via email or phone." />
        <meta name="keywords" content="contact us, Kahanify, customer support, email, phone" />
        <meta property="og:title" content="Contact Us - Kahanify" />
        <meta property="og:description" content="Get in touch with Kahanify's support team. We are here to assist you with any queries you may have. Contact us via email or phone." />
        <meta property="og:image" content={asset28} />
        <meta property="og:url" content="https://Kahanify.com/contact-us" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Kahanify" />
        <meta name="twitter:description" content="Get in touch with Kahanify's support team. We are here to assist you with any queries you may have. Contact us via email or phone." />
        <meta name="twitter:image" content={asset28} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org/",
              "@type": "ContactPage",
              "name": "Contact Us",
              "description": "Contact page for Kahanify, providing contact information for customer support.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+92 332 0516548",
                "contactType": "Customer Service",
                "email": "info@kahanify.com"
              }
            }
          `}
        </script>
      </Helmet>
      <div
        className="w-full h-[85vh] bg-cover  flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: `url(${asset28})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p className="text-[#ff912c] text-2xl md:text-4xl mb-4 animated-text subtitle">
          We'd Love To Hear From You
        </p>
        <h1 className="text-white text-4xl md:text-6xl font-bold animated-text title">
          CONTACT US
        </h1>
      </div>

      <div className="bg-[#18003c] py-6">
        <h1 className="text-white text-3xl text-center py-5 px-8 mx-auto max-w-4xl">
          Our dedicated support team is here to answer your queries
        </h1>

        <div className="container mx-auto flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-12 px-8 py-6">
          <div className="flex flex-col py-4 items-center text-white">
            <Link to="mailto:info@kahanify.com" className="flex flex-col items-center">
              <img src={asset29} className="w-8 h-8 mb-2" alt="Email Icon" />
              <p className="text-2xl font-bold">Email</p>
            </Link>
            <p className="font-bold">info@kahanify.com</p>
          </div>
          <div className="flex flex-col py-4 items-center text-white">
            <Link to="tel:+923320516548" className="flex flex-col items-center">
              <img src={asset30} className="w-8 h-8 mb-2" alt="Phone Icon" />
              <p className="text-2xl font-bold">Phone</p>
            </Link>
            <p className="font-bold">+92 332 0516548</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
