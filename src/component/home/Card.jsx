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
import {Link} from "react-router-dom";
import black1 from '../../assets/black1.png'
import black2 from '../../assets/black2.png'
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

  const sliderRefPG3 = useRef(null);
  const sliderRefPG7 = useRef(null);
  const sliderRefPG10 = useRef(null);

  const nextPG3 = () => sliderRefPG3.current.slickNext();
  const previousPG3 = () => sliderRefPG3.current.slickPrev();

  const nextPG7 = () => sliderRefPG7.current.slickNext();
  const previousPG7 = () => sliderRefPG7.current.slickPrev();

  const nextPG10 = () => sliderRefPG10.current.slickNext();
  const previousPG10 = () => sliderRefPG10.current.slickPrev();

  const sliderSettings = {
    infinite: true,

    lazyLoad: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
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
    <div className="relative">
      <Slider ref={sliderRef} {...sliderSettings}>
        {categoryCards.length === 0 ? (
          <div className="min-h-[30vh] w-[50vw] m-20 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          categoryCards.map((card) => (
            <div key={card.kahani_id} className="flex flex-col p-4">
      <Link to="/Package">        <img
                src={`https://admin.kahanify.com/storage/${card.image}`}
                alt={card.title}
                className="w-full h-full object-cover mb-4"
              /></Link>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <AudioPlay audioUrl={card.audio} />
              <div className="flex justify-between items-center bg-gray-100 p-2">
              <span className='flex space-x-5'>
               <button className="bg-[#18003c] text-white px-2 rounded-lg">
                  PG
                </button>
               <button className="flex self-center mx-2 rounded border border-black text-center font-bold text-xs p-1">
                  {card.pg}+{' '}
                </button>
             
                </span>
              <span className="flex items-center">
                  <img src={fav} alt="Favorite icon" className="h-8 w-8" />
                  <p className="ml-2">{card.views}</p>
                </span>
              </div>
              <div className="flex items-center mt-2">
                <StarRating rating={card.average_rating} />
                <p className="ml-3 text-gray-400">
                  {Number(card.average_rating).toFixed(1)}
                </p>
              </div>
            </div>
          ))
        )}
      </Slider>
      <div className="flex flex-row mt-10 justify-end gap-10">
      <div className="">
  <button
    onClick={next}
    className=" w-10 h-10  md:w-16 md:h-16 text-5xl flex flex-col justify-center items-center border border-black bg-white rounded-full text-black
               transition-transform duration-300 ease-in-out hover:scale-125"
  >
        <img src={black2} alt="left" />

  </button>
</div>

      <div >
  <button
    onClick={previous}
    className=" w-10 h-10  md:w-16 md:h-16 text-5xl self-center flex flex-col justify-center items-center border border-black bg-white rounded-full text-black
               transition-transform duration-300 ease-in-out hover:scale-125"
  >
    <img src={black1} alt="left" />
  </button>
</div>
</div>
      
</div>

  );

  return (
    <div className="p-6 mx-3 md:mx-6">
      <h2 className="text-2xl font-bold text-start md:text-center text-yellow-500 my-8">PG 3+ Stories</h2>
      {renderSlider(category3Plus, sliderRefPG3, nextPG3, previousPG3)}

      <h2 className="text-2xl font-bold text-start md:text-center text-yellow-500  my-8">PG 7+ Stories</h2>
      {renderSlider(category7Plus, sliderRefPG7, nextPG7, previousPG7)}

      <h2 className="text-2xl font-bold text-start md:text-center text-yellow-500  my-8">PG 10+ Stories</h2>
      {renderSlider(category10Plus, sliderRefPG10, nextPG10, previousPG10)}

      {showModal && (
        <Modal isOpen={showModal} onClose={closeModal}>
          <h2 className="text-lg font-semibold">Modal Title</h2>
          <p>Some modal content</p>
        </Modal>
      )}
    </div>
  );
};

export default Card;
