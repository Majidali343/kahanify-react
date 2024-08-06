import React, { useState } from 'react';

const StarRating = ({ rating, onChange }) => {
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const handleClick = (index) => {
    onChange(index);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 ${i <= (hoveredRating || rating) ? 'text-yellow-500' : 'text-gray-400'} cursor-pointer`}
          viewBox="0 0 24 24"
          fill="currentColor"
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
        >
          <path d="M12 .587l3.668 7.568 8.332 1.214-6.004 5.854 1.418 8.257-7.414-3.893-7.414 3.893 1.418-8.257-6.004-5.854 8.332-1.214z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="flex space-x-1">
      {renderStars()}
    </div>
  );
};

export default StarRating;
