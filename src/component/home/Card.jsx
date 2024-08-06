import React, { useState } from 'react';
import { asset1, asset3 } from '../imageLoader';
import StarRating from './StarRating'; 

const cards = Array(12).fill().map((_, index) => ({
  id: index,
  image: asset1,
  title: "بھیڑیا اور چالاک بکری",
  duration: "8min 53sec",
  count: "729",
}));

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState(Array(cards.length).fill(0)); 
  const cardsPerPage = 6;

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

  const handleRatingChange = (cardId, newRating) => {
    setRatings(prevRatings => {
      const newRatings = [...prevRatings];
      newRatings[cardId] = newRating;
      return newRatings;
    });
  };

  return (
    <div className="p-4">
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards.slice(currentIndex, currentIndex + cardsPerPage).map(card => (
            <div key={card.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col p-4">
              <img src={card.image} alt="story" className="w-full h-full object-cover mb-4" />
              <h3 className="text-xl font-semibold text-right mb-2">{card.title}</h3>
              <p className="text-gray-600 mb-2 text-right">{card.duration}</p>
              <div >
                <div
                  className="bg-cover flex justify-between text-black p-2 rounded cursor-pointer"
                  style={{ backgroundImage: `url(${asset3})`, width: '100%', height: '40px' }}
                >

                  <button className="block  rounded border border-black text-lg mx-12 flex jutify-center text-center text-xs p-1">3+</button>
                  <p className="block text-gray-500 ml-2">{card.count}</p>

                </div>
              </div>
              <div className="flex items-center mt-2">
                <StarRating 
                  rating={ratings[card.id]} 
                  onChange={(newRating) => handleRatingChange(card.id, newRating)} 
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center m-4">
          <button
            onClick={prevPage}
            disabled={currentIndex == 0}
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
