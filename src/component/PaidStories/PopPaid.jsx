import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";

const PopPaid = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <div className='flex justify-end'>
              <button
                onClick={closeModal}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <IoClose size={24} />
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">You do not have permission to use this feature</h2>
            <p className="mb-4">Upgrade your package to access exciting features and enjoy more benefits!</p>
            <Link to='/Package'>
              <button className='bg-blue-700 text-white py-2 px-4 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                Upgrade Package
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PopPaid;
