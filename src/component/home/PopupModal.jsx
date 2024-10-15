import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import store from '../../assets/store.png'
import { IoClose } from "react-icons/io5";
import mobile from '../../assets/mbil.png'
const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
             
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
          <div className='flex  justify-end'>
              <button
                onClick={closeModal}
                className=""
              >
                <IoClose />
              </button>
              </div>
            <h2 className="text-xl font-bold mb-4">We are launching Kahanify mobile application</h2>
            <p className="mb-4">Stay tuned for more updates and exciting features coming soon!</p>
            <div className="flex justify-center ">
            <div>
            <img src={mobile} alt="mobile" className='h-60' />
            </div>
              <div className='flex items-center justify-center'>
            <img src={store} alt="store"  className='h-40 '/>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupModal;
