import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 

const SearchBar = ({ items = [] }) => {
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!query) return items;
    return items.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='relative w-1/3'>
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
      {filteredItems.length > 0 ? (
        <ul className='list-disc p-0 m-0'>
          {filteredItems.map((item, index) => (
            <li key={index} className='py-1'>{item}</li>
          ))}
        </ul>
      ) : (
        query && <p className='text-gray-500 mt-2'>No results!</p>
      )}
    </div>
  );
};

export default SearchBar;
