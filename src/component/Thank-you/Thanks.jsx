import React , {useEffect} from 'react';
    import { useNavigate } from 'react-router-dom'; // Import useNavigate
    import '../Css/Thanks.css';
    import { asset0 } from '../imageLoader';
    
    function Thanks() {
        const navigate = useNavigate(); 
      // Track Purchase event
      fbq('track', 'Purchase');
        useEffect(() => {
            const timer = setTimeout(() => {
                navigate('/paidcontent'); 
            }, 45000); 
    
            return () => clearTimeout(timer); 
        }, [navigate]);
    
    return (
      <div className="w-screen thanks-background h-screen flex flex-col justify-center items-center text-center">
        <img src={asset0} alt="logo" className='h-20' />
        <h1 className="text-3xl md:text-7xl  font-extrabold">
          <span className="text-blue-600">THANK</span> <span className="text-pink-500">YOU!</span>
        </h1>
        <h2 className="text-xl md:text-3xl font-semibold text-blue-800 mt-4">
          For Your Purchase!
        </h2>
        <p className="text-pink-500 text-lg pt-10 px-5 md:px-20 lg:px-48 md:text-xl mt-2">
          Your payment has been processed successfully. We’re thrilled to have you as a part of the Kahanify family!
        </p>
        <p className="text-blue-600 text-lg px-5  md:px-20 lg:px-48  md:text-xl mt-4">
          Get ready for a world of magical audio stories designed just for kids.<br /> <span className='font-bold'>Happy listening! </span> 
        </p>
      </div>
    );
  }
  
  export default Thanks;