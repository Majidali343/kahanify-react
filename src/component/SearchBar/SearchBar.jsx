import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='relative w-1/2 md:w-1/3'>
        <input
          type="text"
          value={query}
          className='border-blue-500 my-8 px-4 border-2 rounded-full w-full h-12 pl-10'
          onChange={handleSearch}
          placeholder="Search..."
        />
        <FontAwesomeIcon
          icon={faSearch} 
          style={{
            color: "#0878af",
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
