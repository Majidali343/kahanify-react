import React from 'react';
import { asset12 } from '../imageLoader';
const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[100vh] w-full">
      <img src={asset12} alt="Loader" className='h-20 w-20' />
    </div>
  );
};

export default Loader;
