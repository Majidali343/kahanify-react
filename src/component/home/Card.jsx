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

  // Separate refs for each slider
  const sliderRefPG3 = useRef(null);
  const sliderRefPG7 = useRef(null);
  const sliderRefPG10 = useRef(null);

  // Separate functions for next/previous navigation for each slider
  const nextPG3 = () => {
    sliderRefPG3.current.slickNext();
  };
  const previousPG3 = () => {
    sliderRefPG3.current.slickPrev();
  };

  const nextPG7 = () => {
    sliderRefPG7.current.slickNext();
  };
  const previousPG7 = () => {
    sliderRefPG7.current.slickPrev();
  };

  const nextPG10 = () => {
    sliderRefPG10.current.slickNext();
  };
  const previousPG10 = () => {
    sliderRefPG10.current.slickPrev();
  };

  const sliderSettings = {
    centerMode: true,
    infinite: false,
    lazyLoad: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    dots: true, // Disable built-in arrows
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

  
  const category3Plus = cards.filter((card) => card.pg == 3);
  const category7Plus = cards.filter((card) => card.pg == 7);
  const category10Plus = cards.filter((card) => card.pg == 10);

  const renderSlider = (categoryCards, sliderRef, next, previous) => (
    <div>
      <Slider ref={sliderRef} {...sliderSettings}>
        {categoryCards.length === 0 ? (
          <div className="min-h-[30vh] w-[50vw] m-auto flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          categoryCards.map((card) => (
            <div
            key={card.kahani_id}
            className=" lg:mx-10 overflow-hidden flex flex-col p-4"
            style={{ cursor: 'pointer' }}
          >
            <img
              src={`https://admin.kahanify.com/storage/${card.image}`}
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
      {/* <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={previous}
          className="px-4 py-2 bg-yellow-500 rounded-full text-white"
        >
          Previous
        </button>
        <button
          onClick={next}
          className="px-4 py-2 bg-yellow-500 rounded-full text-white"
        >
          Next
        </button>
      </div> */}
    </div>
  );

  return (
    <div className="p-6 mx-3 md:mx-6">
      <div className="relative">
        {/* Slider for PG 3+ */}
        <h2 className="text-2xl py-6 text-center text-yellow-500 font-bold mb-4">
          PG 3+ Stories
        </h2>
        <div className="slider-container mb-8">
          {renderSlider(category3Plus, sliderRefPG3, nextPG3, previousPG3)}
        </div>

        {/* Slider for PG 7+ */}
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-4">
          PG 7+ Stories
        </h2>
        <div className="slider-container mb-8">
          {renderSlider(category7Plus, sliderRefPG7, nextPG7, previousPG7)}
        </div>

        {/* Slider for PG 10+ */}
        <h2 className="text-2xl font-bold text-center text-yellow-500 mb-4">
          PG 10+ Stories
        </h2>
        <div className="slider-container">
          {renderSlider(category10Plus, sliderRefPG10, nextPG10, previousPG10)}
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

export default Card;
