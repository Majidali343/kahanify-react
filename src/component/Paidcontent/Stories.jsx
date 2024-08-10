import React, { useState, useEffect } from 'react';
import { asset3 } from '../imageLoader';
import { Link } from 'react-router-dom';
import StarRating from '../home/StarRating'; 
import { allStories } from '../Service/api';

const Stories = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 9;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await allStories();
        if (response && response.data) {
          setData(response.data); 
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []); 

  const nextPage = () => {
    if (currentIndex + cardsPerPage < data.length) {
      setCurrentIndex(currentIndex + cardsPerPage);
    }
  };

  const prevPage = () => {
    if (currentIndex - cardsPerPage >= 0) {
      setCurrentIndex(currentIndex - cardsPerPage);
    }
  };

  return (
    <div className="p-4">
      <div className='flex justify-center'>
        {/* Optional: Add any additional content here */}
      </div>
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.slice(currentIndex, currentIndex + cardsPerPage).map(card => ( 
            <Link key={card.kahani_id} to={`/kahani/${card.kahani_id}`}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col p-4">
                <img 
                  src={`https://kahaniapi.realtechcrm.online/storage/${card.image}`} 
                  alt="story" 
                  className="w-full h-full object-cover mb-4" 
                />
                <h2 className="text-white text-xs">{card.created_at}</h2>
                <h3 className="text-xl font-semibold text-right mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-2 text-right">{card.duration}</p>
                <div>
                  <div
                    className="bg-cover flex justify-between text-black p-2 rounded cursor-pointer"
                    style={{ backgroundImage: `url(${asset3})`, width: '100%', height: '40px' }}
                  >
                    <button className="block rounded border border-black mx-12 text-center text-xs p-1">3+</button>
                    <p className="block text-gray-500 ml-2">{card.views}</p>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <StarRating 
                    rating={card.average_rating} 
                  />
                  <p className='mx-3 text-gray-400'>{card.number_of_ratings}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center m-4">
          <button
            onClick={prevPage}
            disabled={currentIndex === 0}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 mx-2"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentIndex + cardsPerPage >= data.length}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 mx-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stories;
