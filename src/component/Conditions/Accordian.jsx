import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion border-y border-[#f8c02c] p-3 sm:p-1 md:p-4 lg:p-6 xl:p-7">
    <div className="accordion-header cursor-pointer" onClick={toggleAccordion}>
      <h2 className={`accordion-title flex justify-between items-center font-bold text-sm sm:text-xs md:text-lg lg:text-xl ${isOpen ? 'text-[#f8c02c]' : 'text-pink-600'}`}>
        {title}
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className={`accordion-icon transition-transform duration-300 ${isOpen ? 'open text-pink-600' : 'close text-[#f8c02c]'}`}
        />
      </h2>
    </div>
    {isOpen && <div className="accordion-content mt-0 sm:mt-1 md:mt-3 lg:mt-4 text-xs sm:text-sm md:text-base">{children}</div>}
  </div>
    );
}

export default Accordion;
