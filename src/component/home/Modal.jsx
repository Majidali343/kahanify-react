// Modal.js
import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white mx-auto lg:mx-[25rem] p-4 rounded shadow-lg">
        
        <button onClick={onClose} className=" bg-white rounded-full absolute top-6 right-6 h-8 w-8 text-black">
          &times;
        </button>
                {children}
      </div>
    </div>
  );
};

export default Modal;
