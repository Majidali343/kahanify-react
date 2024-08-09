import React, { useState, useEffect } from 'react';

const Filter = ({ data, onFilter  }) => {
  const [filterOption, setFilterOption] = useState('default');
  
  useEffect(() => {
    const handleFiltering = () => {
      let sortedData = [...data]; 

      switch (filterOption) {
        case 'newest':
          sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'oldest':
          sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case 'popular':
          sortedData.sort((a, b) => b.rating - a.rating);
          break;
        case 'default':
        default:
          break;
      }

      onFilter(sortedData); 
    };

    handleFiltering(); 
  }, [filterOption, data,  onFilter]); 
  
  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  return (
    <div className='flex items-center'>
      <label className='font-bold bg-blue-600 text-white rounded-l-md p-2 mr-0' htmlFor="filterOption">Sort by:</label>
      <select 
        className='bg-white border border-gray-300 rounded-r-md p-2 text-gray-700'
        id="filterOption"
        value={filterOption} 
        onChange={handleFilterChange}
      >
        <option value="default">Select</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="popular">Popular</option>
      </select>
    </div>
  );
};

export default Filter;
