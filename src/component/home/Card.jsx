import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { asset1, asset3 } from '../imageLoader';
import StarRating from './StarRating'; 
import { famousStories } from '../Service/api';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  
  const isLoggedIn = useSelector(state => state.auth.status);

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

  const handleCardClick = () => {
    if (isLoggedIn) {
      navigate(`Package`);
    } else {
      navigate('/login');
    }
  };

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
    <div className="p-4 mx-3 md:mx-6">
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards.length === 0 ? (

              <div className="min-h-[30vh] w-[50vw] m-auto justify-end items-end flex">
            
            <Loader />
            </div>
          ) : (
            cards.slice(currentIndex, currentIndex + cardsPerPage).map(card => (
              <div 
                key={card.kahani_id} 
                className="bg-white shadow-lg rounded-lg lg:mx-4 overflow-hidden flex flex-col p-4"
                onClick={() => handleCardClick(card.kahani_id)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={`https://kahaniapi.realtechcrm.online/storage/${card.image}`} 
                  alt="story" 
                  className="w-full h-full object-cover mb-4" 
                />
                <h3 className="text-xl font-semibold text-right mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-2 text-right">{card.duration}</p>
                <div>
                  <div
                    className="xl:bg-contain bg:cover bg-no-repeat flex justify-between items-center text-black p-2 rounded cursor-pointer"
                    style={{ backgroundImage: `url(${asset3})`, width: '100%', height: '40px' }}
                  >
                    <button className="flex self-center rounded border border-black mx-12 text-center font-bold text-xs p-1">3+</button>
                    <p className=" text-gray-500 flex self-center text-sm ml-2">{card.views}</p>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <StarRating 
                    rating={card.average_rating} 
                  />
                  <p className='mx-3 text-gray-400'>{Number(card.average_rating).toFixed(1)}</p>
                </div>
              </div>
            ))
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
