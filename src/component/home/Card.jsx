
// import React, { useState, useEffect, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
// import { useSelector } from 'react-redux';
// import { famousStories } from '../Service/api';
// import Loader from '../loader/Loader';
// import fav from '../../assets/Fav.png';
// import AudioPlay from './Audioplay';
// import StarRating from './StarRating';
// import { useNavigate } from 'react-router-dom';
// import Modal from './Modal'; // Create a separate Modal component
// import Slider from "react-slick";
// const Card = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [cards, setCards] = useState([]);
//   const [isPlaying, setIsPlaying] = useState(null);
//   const [currentTime, setCurrentTime] = useState({});
//   const [duration, setDuration] = useState({});
//   const audioRefs = useRef({});
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState('');
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
  
//     const settings = {
//       dots: false,
//       infinite: true,
//       slidesToShow: 3,
//       slidesToScroll: 1,
//       autoplay: true,
//       speed: 2000,
//       autoplaySpeed: 2000,
//       cssEase: "linear"
//     };


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
//     ? cards.filter(card => card.pg == parseInt(selectedCategory))
//     : cards;

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//     setCurrentIndex(0);
//   };

//   return (
//     <div className="p-4 mx-3 md:mx-6">
//       <div className='flex flex-col items-center justify-center'>
//         <div className="relative inline-block w-64">
//           <select
//             className="block appearance-none w-full bg-[#18003c] my-8 text-white border border-gray-100 rounded-md shadow-sm px-4 py-2 pr-8"
//             value={selectedCategory}
//             onChange={handleCategoryChange}
//           >
//             <option className='bg-white text-gray-800' value="">All Stories</option>
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
//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> */}
        
        
//         <div className="slider-container ">
//         <Slider {...settings}>
//           {cards.length === 0 ? (
//             <div className="min-h-[30vh]  w-[50vw] m-auto flex justify-center items-center">
//               <Loader />
//             </div>
//           ) : (
//             filteredCards.slice(currentIndex, currentIndex + cardsPerPage).map(card => (
//               <div 
//                 key={card.kahani_id} 
//                 className="bg-white   lg:mx-10 overflow-hidden flex flex-col p-4"
//                 style={{ cursor: 'pointer',
//                   margin : "30px !important"
//                  }}
//               >
//                 <img 
//                   src={`https://kahanifylaravel.kahanify.com/storage/${card.image}`} 
//                   alt={card.title} 
//                   className="w-full h-full object-cover mb-4" 
//                 />
//                 <h3 className="text-xl font-semibold text-right mb-2">{card.title}</h3>

//                 <AudioPlay   audioUrl={card.audio} />
//                 <div className="w-full h-auto flex justify-between items-center bg-gray-100">
//                   <div className="p-1 flex">
//                     <button className="bg-[#18003c] text-white px-1 rounded-lg">PG</button>
//                     <button className="flex self-center mx-2 rounded border border-black text-center font-bold text-xs p-1">{card.pg}+ </button>
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
//           </Slider>
//         </div>
//         {showModal && (
//           <Modal isOpen={showModal} onClose={closeModal}>
//             <h2 className="text-lg font-semibold">Modal Title</h2>
//             <p>Some modal content</p>
//           </Modal>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Card;
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { famousStories } from '../Service/api';
import Loader from '../loader/Loader';
import fav from '../../assets/Fav.png';
import AudioPlay from './Audioplay';
import StarRating from './StarRating';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Slider from 'react-slick';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

const Card = () => {
  const [cards, setCards] = useState([]);
  const [currentTime, setCurrentTime] = useState({});
  const [duration, setDuration] = useState({});
  const audioRefs = useRef({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.status);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await famousStories();
        if (response && response.data) {
          setCards(response.data);
          const initialTimes = {};
          const initialDurations = {};
          response.data.forEach((card) => {
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
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "yellow", // Yellow button background
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          right: "-20px", // Adjust positioning
          zIndex: 1,
        }}
        onClick={onClick}
      >
      </button>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "yellow", // Yellow button background
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          left: "-20px", // Adjust positioning
          zIndex: 1,
        }}
        onClick={onClick}
      >
      </button>
    );
  }

  const sliderSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const handleTimeUpdate = (cardId) => {
    const audioElement = audioRefs.current[cardId];
    setCurrentTime((prev) => ({
      ...prev,
      [cardId]: audioElement.currentTime,
    }));
    setDuration((prev) => ({
      ...prev,
      [cardId]: audioElement.duration,
    }));
  };

  useEffect(() => {
    const audioElements = cards.map((card) => {
      const audioElement = new Audio();
      audioRefs.current[card.kahani_id] = audioElement;

      audioElement.addEventListener('timeupdate', () =>
        handleTimeUpdate(card.kahani_id)
      );
      audioElement.addEventListener('loadedmetadata', () => {
        setDuration((prev) => ({
          ...prev,
          [card.kahani_id]: audioElement.duration,
        }));
      });

      return audioElement;
    });

    return () => {
      audioElements.forEach((audioElement) => {
        audioElement.pause();
        audioElement.src = '';
      });
    };
  }, [cards]);

  const closeModal = () => setShowModal(false);

  // Filter stories by category
  const category3Plus = cards.filter((card) => card.pg == 3);
  const category7Plus = cards.filter((card) => card.pg == 7);
  const category10Plus = cards.filter((card) => card.pg == 10);

  const renderSlider = (categoryCards) => (
    <Slider {...sliderSettings}>
      {categoryCards.length === 0 ? (
        <div className="min-h-[30vh] w-[50vw] m-auto flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        categoryCards.map((card) => (
          <div
            key={card.kahani_id}
            className="bg-white lg:mx-10 overflow-hidden flex flex-col p-4"
            style={{ cursor: 'pointer', margin: '30px !important' }}
          >
            <img
              src={`https://kahanifylaravel.kahanify.com/storage/${card.image}`}
              alt={card.title}
              className="w-full h-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-right mb-2">
              {card.title}
            </h3>
            <AudioPlay audioUrl={card.audio} />
            <div className="w-full h-auto flex justify-between items-center bg-gray-100">
              <div className="p-1 flex">
                <button className="bg-[#18003c] text-white px-1 rounded-lg">
                  PG
                </button>
                <button className="flex self-center mx-2 rounded border border-black text-center font-bold text-xs p-1">
                  {card.pg}+{' '}
                </button>
              </div>
              <div className="p-1 flex">
                <img src={fav} alt="Favorite icon" className="h-8 w-8" />
                <p className="text-gray-500 flex self-center text-sm ml-2">
                  {card.views}
                </p>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <StarRating rating={card.average_rating} />
              <p className="mx-3 text-gray-400">
                {Number(card.average_rating).toFixed(1)}
              </p>
            </div>
          </div>
        ))
      )}
    </Slider>
  );

  return (
    <div className="p-4 mx-3 md:mx-6">
      <div className="relative">
        {/* Slider for PG 3+ */}
        <h2 className="text-2xl text-center text-yellow-500 font-bold mb-4">PG 3+ Stories</h2>
        <div className="slider-container mb-8">{renderSlider(category3Plus)}</div>

        {/* Slider for PG 7+ */}
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-4">PG 7+ Stories</h2>
        <div className="slider-container mb-8">{renderSlider(category7Plus)}</div>

        {/* Slider for PG 10+ */}
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-4">PG 10+ Stories</h2>
        <div className="slider-container">{renderSlider(category10Plus)}</div>

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

export default Card;
