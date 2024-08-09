import React, { useState, useEffect, useCallback } from 'react';
import { asset3 } from '../imageLoader';
import { Link } from "react-router-dom";
import StarRating from '../home/StarRating'; 
import Filter from '../Filter/Filter'; 
import { allStories } from '../Service/api';

const Stories = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState({});
  const [favoriteIds, setFavoriteIds] = useState([]);
  const cardsPerPage = 9;

  useEffect(() => {
    const fetchStories = async () => {
      console.log ("first")
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

  const applyFilter = useCallback(() => {
    const filteredStories = data.filter(story => favoriteIds.includes(story.kahani_id));
    console.log ("Third")

    setFilteredData(filteredStories);
    setCurrentIndex(0); 
  }, [data, favoriteIds]);

  useEffect(() => {
    console.log ("secound")

    applyFilter();
  }, [applyFilter]); 

  const nextPage = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + cardsPerPage));
  };

  const prevPage = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - cardsPerPage, 0));
  };

  const handleRatingChange = (cardId, newRating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [cardId]: newRating
    }));
  };

  const handleFilter = (filteredData) => {
  setFilteredData(filteredData);
    setCurrentIndex(0); 
  };

  return (
    <div className="p-4">
      <div className='flex justify-center'>
        <Filter data={data}  onFilter={handleFilter} />
      </div>
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredData.slice(currentIndex, currentIndex + cardsPerPage).map(card => ( 
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
                    rating={ratings[card.kahani_id] || 0} 
                    onChange={(newRating) => handleRatingChange(card.kahani_id, newRating)} 
                  />
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
            disabled={currentIndex + cardsPerPage >= filteredData.length}
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
