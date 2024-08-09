import React, { useState, useEffect } from 'react';
import { asset1, asset3 } from '../imageLoader';
import StarRating from './StarRating'; 
import {  famousStories } from '../Service/api';
import {Link} from 'react-router-dom'

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [cards, setCards] = useState([]);
 
  const cardsPerPage = 6;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await famousStories();
        if (response && response.data) {
          setCards(response.data);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  const nextPage = () => {
    if (currentIndex + cardsPerPage < cards.length) {
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
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards.length === 0 ? (
            <p>No stories available.</p>
          ) : (
            cards.slice(currentIndex, currentIndex + cardsPerPage).map(card => (
              <Link to='login'>

<div key={card.kahani_id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col p-4">
                <img src={`https://kahaniapi.realtechcrm.online/storage/${card.image}`} alt="story" className="w-full h-full object-cover mb-4" />
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
              </Link>  ))
          )}
          
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
            disabled={currentIndex + cardsPerPage >= cards.length}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 mx-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
