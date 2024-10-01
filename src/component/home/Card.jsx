// import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
// import { useSelector } from 'react-redux';
// import { famousStories } from '../Service/api';
// import Loader from '../loader/Loader';
// import fav from '../../assets/Fav.png';
// import StarRating from './StarRating';
// import { useNavigate } from 'react-router-dom';
// import Modal from './Modal'; // Create a separate Modal component

// const Slider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [cards, setCards] = useState([]);
//   const [isPlaying, setIsPlaying] = useState(null);
//   const [currentTime, setCurrentTime] = useState({});
//   const [duration, setDuration] = useState({});
//   const audioRefs = useRef({});
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();
//   const isLoggedIn = useSelector(state => state.auth.status);
//   const cardsPerPage = 6;

//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const response = await famousStories();
//         if (response && response.data) {
//           setCards(response.data);
//           const initialTimes = {};
//           const initialDurations = {};
//           response.data.forEach(card => {
//             initialTimes[card.kahani_id] = 0;
//             initialDurations[card.kahani_id] = 0;
//           });
//           setCurrentTime(initialTimes);
//           setDuration(initialDurations);
//         }
//       } catch (error) {
//         console.error('Error fetching stories:', error);
//         // Optionally set an error state here
//       }
//     };

//     fetchStories();
//   }, []);

//   const nextPage = () => {
//     if (currentIndex + cardsPerPage < cards.length) {
//       setCurrentIndex(prev => prev + cardsPerPage);
//     }
//   };

//   const prevPage = () => {
//     if (currentIndex - cardsPerPage >= 0) {
//       setCurrentIndex(prev => prev - cardsPerPage);
//     }
//   };

//   const togglePlayPause = (audioSrc, cardId) => {
//     const audioElement = audioRefs.current[cardId];

//     if (isPlaying === cardId) {
//       audioElement.pause();
//       setIsPlaying(null);
//     } else {
//       if (isPlaying) {
//         audioRefs.current[isPlaying].pause();
//       }
//       audioElement.src = audioSrc;
//       audioElement.play();
//       setIsPlaying(cardId);
//       setTimeout(() => {
//         if (isPlaying === cardId) {
//           audioElement.pause();
//           setIsPlaying(null);
//           setShowModal(true); 
//         }
//       }, 30000); 
//     }
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   const handleTimeUpdate = (cardId) => {
//     const audioElement = audioRefs.current[cardId];
//     setCurrentTime(prev => ({ ...prev, [cardId]: audioElement.currentTime }));
//     setDuration(prev => ({ ...prev, [cardId]: audioElement.duration }));
//   };

//   useEffect(() => {
//     const audioElements = cards.map(card => {
//       const audioElement = new Audio();
//       audioRefs.current[card.kahani_id] = audioElement;

//       audioElement.addEventListener('timeupdate', () => handleTimeUpdate(card.kahani_id));
//       audioElement.addEventListener('loadedmetadata', () => {
//         setDuration(prev => ({ ...prev, [card.kahani_id]: audioElement.duration }));
//       });

//       return audioElement;
//     });

//     return () => {
//       audioElements.forEach(audioElement => {
//         audioElement.pause();
//         audioElement.src = '';
//       });
//     };
//   }, [cards]);

//   const closeModal = () => setShowModal(false);
//   const filteredCards = selectedCategory
//   ? cards.filter(card => card.pg === parseInt(selectedCategory))
//   : cards;
// const handleCategoryChange = (event) => {
//   setSelectedCategory(event.target.value);
//   setCurrentIndex(0);
// };

//   return (
//     <div className="p-4 mx-3 md:mx-6">
//       <div className='flex flex-col items-center justify-center'>
//         <div className="relative inline-block w-64">
//           <select
//             className="block appearance-none w-full bg-[#18003c] text-white border border-gray-100 rounded-md shadow-sm px-4 py-2 pr-8"
//             value={selectedCategory}
//             onChange={handleCategoryChange}
//           >
//             <option className='bg-white text-gray-800' value="">Select a category</option>
//             <option className='bg-white text-gray-800' value="3">PG 3+</option>
//             <option className='bg-white text-gray-800' value="7">PG 7+</option>
//             <option className='bg-white text-gray-800' value="10">PG 10+</option>
//           </select>
//           <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//             <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10l5 5 5-5H7z" />
//             </svg>
//           </div>
//         </div>
//       </div>
    
//       <div className="relative">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {cards.length === 0 ? (
//             <div className="min-h-[30vh] w-[50vw] m-auto flex justify-center items-center">
//               <Loader />
//             </div>
//           ) : (
//             cards.slice(currentIndex, currentIndex + cardsPerPage).map(card => (
//               <div 
//                 key={card.kahani_id} 
//                 className="bg-white rounded-lg lg:mx-4 overflow-hidden flex flex-col p-4"
//                 style={{ cursor: 'pointer' }}
//               >
//                 <img 
//                   src={`https://kahanifylaravel.kahanify.com/storage/${card.image}`} 
//                   alt={card.title} 
//                   className="w-full h-full object-cover mb-4" 
//                 />
//                 <h3 className="text-xl font-semibold text-right mb-2">{card.title}</h3>
//                 <div>
//                   <div className="flex items-center justify-between">
//                     <span>{formatTime(currentTime[card.kahani_id] || 0)}</span>
//                     <input
//                       type="range"
//                       min="0"
//                       max={duration[card.kahani_id] || 0}
//                       value={currentTime[card.kahani_id] || 0}
//                       onChange={(e) => {
//                         const newTime = parseFloat(e.target.value);
//                         audioRefs.current[card.kahani_id].currentTime = newTime;
//                         setCurrentTime(prev => ({ ...prev, [card.kahani_id]: newTime }));
//                       }}
//                       className="w-full mx-2"
//                     />
//                     <span>{formatTime(duration[card.kahani_id] || 0)}</span>
//                   </div>
//                   <div className="flex justify-center items-center">
//                     <button
//                       onClick={() => togglePlayPause(`https://kahanifylaravel.kahanify.com/storage/${card.audio}`, card.kahani_id)}
//                       className="text-sm flex self-center sm:text-lg md:text-xl mx-2"
//                       aria-label={isPlaying === card.kahani_id ? "Pause" : "Play"}
//                     >
//                       <FontAwesomeIcon icon={isPlaying === card.kahani_id ? faPause : faPlay} />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="w-full h-auto flex justify-between items-center bg-gray-100">
//                   <div className="p-1 flex">
//                     <button className="bg-[#18003c] text-white px-1 rounded-lg">PG</button>
//                     <button className="flex self-center mx-2 rounded border border-black text-center font-bold text-xs p-1">{card.pg} +</button>
//                   </div>
//                   <div className="p-1 flex">
//                     <img src={fav} alt="Favorite icon" className="h-8 w-8" />
//                     <p className="text-gray-500 flex self-center text-sm ml-2">{card.views}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center mt-2">
//                   <StarRating rating={card.average_rating} />
//                   <p className="mx-3 text-gray-400">{Number(card.average_rating).toFixed(1)}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//         <div className="flex justify-center m-4">
//           <button
//             onClick={prevPage}
//             disabled={currentIndex === 0}
//             className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 mx-2"
//           >
//             Previous
//           </button>
//           <button
//             onClick={nextPage}
//             disabled={currentIndex + cardsPerPage >= cards.length}
//             className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 mx-2"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Modal Component */}
//       {showModal && (
//         <Modal onClose={closeModal}>
//           <h2 className="text-lg font-semibold">Buy a Package</h2>
//           <p className="mt-2">Enjoy unlimited audio access by purchasing a package.</p>
//           <button onClick={closeModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
//             Close
//           </button>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Slider;
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { famousStories } from '../Service/api';
import Loader from '../loader/Loader';
import fav from '../../assets/Fav.png';
import StarRating from './StarRating';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal'; // Create a separate Modal component

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [isPlaying, setIsPlaying] = useState(null);
  const [currentTime, setCurrentTime] = useState({});
  const [duration, setDuration] = useState({});
  const audioRefs = useRef({});
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.status);
  const cardsPerPage = 6;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await famousStories();
        if (response && response.data) {
          setCards(response.data);
          const initialTimes = {};
          const initialDurations = {};
          response.data.forEach(card => {
            initialTimes[card.kahani_id] = 0;
            initialDurations[card.kahani_id] = 0;
          });
          setCurrentTime(initialTimes);
          setDuration(initialDurations);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  const nextPage = () => {
    if (currentIndex + cardsPerPage < cards.length) {
      setCurrentIndex(prev => prev + cardsPerPage);
    }
  };

  const prevPage = () => {
    if (currentIndex - cardsPerPage >= 0) {
      setCurrentIndex(prev => prev - cardsPerPage);
    }
  };

  const togglePlayPause = (audioSrc, cardId) => {
    const audioElement = audioRefs.current[cardId];

    if (isPlaying === cardId) {
      audioElement.pause();
      setIsPlaying(null);
    } else {
      if (isPlaying) {
        audioRefs.current[isPlaying].pause();
      }
      audioElement.src = audioSrc;
      audioElement.play();
      setIsPlaying(cardId);

      setTimeout(() => {
        if (isPlaying === cardId) {
          audioElement.pause();
          setIsPlaying(null);
          setShowModal(true); 
        }
      }, 30000); 
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimeUpdate = (cardId) => {
    const audioElement = audioRefs.current[cardId];
    setCurrentTime(prev => ({ ...prev, [cardId]: audioElement.currentTime }));
    setDuration(prev => ({ ...prev, [cardId]: audioElement.duration }));
  };

  useEffect(() => {
    const audioElements = cards.map(card => {
      const audioElement = new Audio();
      audioRefs.current[card.kahani_id] = audioElement;

      audioElement.addEventListener('timeupdate', () => handleTimeUpdate(card.kahani_id));
      audioElement.addEventListener('loadedmetadata', () => {
        setDuration(prev => ({ ...prev, [card.kahani_id]: audioElement.duration }));
      });

      return audioElement;
    });

    return () => {
      audioElements.forEach(audioElement => {
        audioElement.pause();
        audioElement.src = '';
      });
    };
  }, [cards]);

  const closeModal = () => setShowModal(false);

  const filteredCards = selectedCategory
    ? cards.filter(card => card.pg === parseInt(selectedCategory))
    : cards;

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentIndex(0);
  };

  return (
    <div className="p-4 mx-3 md:mx-6">
      <div className='flex flex-col items-center justify-center'>
        <div className="relative inline-block w-64">
          <select
            className="block appearance-none w-full bg-[#18003c] text-white border border-gray-100 rounded-md shadow-sm px-4 py-2 pr-8"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option className='bg-white text-gray-800' value="">Select a category</option>
            <option className='bg-white text-gray-800' value="3">PG 3+</option>
            <option className='bg-white text-gray-800' value="7">PG 7+</option>
            <option className='bg-white text-gray-800' value="10">PG 10+</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>
      </div>
    
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards.length === 0 ? (
            <div className="min-h-[30vh] w-[50vw] m-auto flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            filteredCards.slice(currentIndex, currentIndex + cardsPerPage).map(card => (
              <div 
                key={card.kahani_id} 
                className="bg-white rounded-lg lg:mx-4 overflow-hidden flex flex-col p-4"
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={`https://kahanifylaravel.kahanify.com/storage/${card.image}`} 
                  alt={card.title} 
                  className="w-full h-full object-cover mb-4" 
                />
                <h3 className="text-xl font-semibold text-right mb-2">{card.title}</h3>
                <div>
                  <div className="flex items-center justify-between">
                    <span>{formatTime(currentTime[card.kahani_id] || 0)}</span>
                    <input
                      type="range"
                      min="0"
                      max={duration[card.kahani_id] || 0}
                      value={currentTime[card.kahani_id] || 0}
                      onChange={(e) => {
                        const newTime = parseFloat(e.target.value);
                        audioRefs.current[card.kahani_id].currentTime = newTime;
                        setCurrentTime(prev => ({ ...prev, [card.kahani_id]: newTime }));
                      }}
                      className="w-full mx-2"
                    />
                    <span>{formatTime(duration[card.kahani_id] || 0)}</span>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => togglePlayPause(`https://kahanifylaravel.kahanify.com/storage/${card.audio}`, card.kahani_id)}
                      className="text-sm flex self-center sm:text-lg md:text-xl mx-2"
                      aria-label={isPlaying === card.kahani_id ? "Pause" : "Play"}
                    >
                      <FontAwesomeIcon icon={isPlaying === card.kahani_id ? faPause : faPlay} />
                    </button>
                  </div>
                </div>
                <div className="w-full h-auto flex justify-between items-center bg-gray-100">
                  <div className="p-1 flex">
                    <button className="bg-[#18003c] text-white px-1 rounded-lg">PG</button>
                    <button className="flex self-center mx-2 rounded border border-black text-center font-bold text-xs p-1">{card.pg}+ </button>
                  </div>
                  <div className="p-1 flex">
                    <img src={fav} alt="Favorite icon" className="h-8 w-8" />
                    <p className="text-gray-500 flex self-center text-sm ml-2">{card.views}</p>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <StarRating rating={card.average_rating} />
                  <p className="mx-3 text-gray-400">{Number(card.average_rating).toFixed(1)}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={prevPage}
            disabled={currentIndex === 0}
            className={`px-4 py-2 mx-2 rounded-md ${currentIndex === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#18003c] text-white'}`}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentIndex + cardsPerPage >= filteredCards.length}
            className={`px-4 py-2 mx-2 rounded-md ${currentIndex + cardsPerPage >= filteredCards.length ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#18003c] text-white'}`}
          >
            Next
          </button>
        </div>
        {showModal && (
          <Modal isOpen={showModal} onClose={closeModal}>
            <h2 className="text-lg font-semibold">Modal Title</h2>
            <p>Some modal content</p>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Slider;
