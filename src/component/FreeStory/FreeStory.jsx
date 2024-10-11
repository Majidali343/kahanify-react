import { useSelector } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';

import Loader from '../loader/Loader';
import fav from '../../assets/Fav.png';
import AudioPlay from '../home/Audioplay';
import StarRating from '../home/StarRating';
import Modal from '../home/Modal';
import Slider from 'react-slick';

import AudioPlayer from '../AudioPlayer/AudioPlayer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause, faHeart, faBackward, faForward, faEye } from '@fortawesome/free-solid-svg-icons';
import { asset37 ,asset10 , asset24, asset25, asset26, asset27 } from '../imageLoader';
import Pic from '../../assets/Mom1.png';
library.add(faPlay, faPause, faHeart, faBackward, faForward, faEye);
import { Helmet } from 'react-helmet';
import {useNavigate, Link, NavLink } from 'react-router-dom';
import '../Css/home.css'
import { freepackages, getFree, veiws, famousStories } from '../Service/api';
import Card from '../home/Card';

function FreeStory() {
  const [audio, setAudio] = useState([]);
  const [image, setImage] = useState([]);
  const [views, setViews] = useState([]);
  const [packages, setPackages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [cards, setCards] = useState([]);
  const [currentTime, setCurrentTime] = useState({});
  const [duration, setDuration] = useState({});
  const audioRefs = useRef({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.status);

  const cardsPerPage = 6;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getFree();
        setAudio(response.data.audio);
        setImage(response.data.image);
        setViews(response.data.views);

                const packageResponse = await freepackages();
                setPackages(packageResponse || []);
      
              } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };

    fetchVideos();
  }, []);

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



  const addToCart = (packagename, pricePerItem, image , description, id) => {
    const existingCart = sessionStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];

    const itemIndex = cart.findIndex(item => item.packagename === packagename);

    if (itemIndex > -1) {
      cart[itemIndex].quantity += 1;
    } else {
      cart.push({
        packagename,
        pricePerItem,
        quantity: 1,
        image,
        description,
        id
      });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart'); 
  };

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
    dots: true, 
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
              src={`https://kahanifylaravel.kahanify.com/storage/${card.image}`}
              alt={card.title}
              className="w-full h-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold  text-white text-right mb-2">
              {card.title}
            </h3>
            <AudioPlay audioUrl={card.audio} />
            <div className="w-full h-auto flex justify-between items-center bg-[#ffffff2c]">
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
      <div className="flex  justify-center mt-4 space-x-4">
        <button
          onClick={previous}
          className="py-2 w-[90px] my-6 bg-yellow-500 hove:bg-pink-600 rounded text-white"
        >
          Previous
        </button>
        <button
          onClick={next}
          className="py-2 w-[90px] my-6 bg-yellow-500 hove:bg-pink-500  hove:bg-pink-600 rounded text-white"
        >
          Next
        </button>
      </div>
    </div>
  );


  return (
    <>
    <Helmet>
    <title>Free Story - Engaging Storytelling with Audio | Kahanify</title>
    <meta name="description" content="Listen to an engaging free story with audio, perfect for relaxing or entertainment. Explore more stories on Kahanify." />
    <meta name="keywords" content="free story, audio story, video story, read story, storytelling, entertainment, relaxation" />
    <meta property="og:title" content="Free Story - Engaging Storytelling with Audio and video |Kahanify" />
    <meta property="og:description" content="Listen to an engaging free story with audio ,video and read, perfect for relaxing or entertainment. Explore more stories on Kahanify." />
    <meta property="og:image" content={asset37} />
    <meta property="og:url" content="https://Kahanify.com/FreeStory" />
    <meta property="og:type" content="website" />
  </Helmet>
    <div>
    


      <AudioPlayer
        // audioSrc={links.audio}
        audioSrc={`https://kahanifylaravel.kahanify.com/storage/${audio}`}
        imageSrc={`https://kahanifylaravel.kahanify.com/storage/${image}`}
        viewCount={views}
   />

<div className='bg-[#18003c]'>
  <h1 className='text-center text-xl md:text-3xl lg:text-5xl font-bold text-yellow-500 underline'>
    All Stories
  </h1>
</div>


<div className='bg-[#18003c]'>
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
    </div>

<div className='bg-[#18003c] py-10'>
  <h1 className='text-center text-xl md:text-3xl lg:text-5xl font-bold text-yellow-500 underline'> Our Packages</h1>
</div>
    <div className="bg-[#18003c] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
 {packages.map((pkg) => (
    <div key={pkg.id} className="flex flex-col py-4 items-center">
      {/* <Link to={`/${pkg.route}`}> */}
      {/* <Link key={card.kahani_id} to={`/kahani/${card.kahani_id}`}> */}
      <Link to={`/package/${pkg.id}`}>
        <img 
        // src={pkg.image}
        src={`https://kahanifylaravel.kahanify.com/storage/app/public/${pkg.image}`}
        className="mb-3 h-[300px] w-[300px]" alt={pkg.name} />
      </Link>
      <p className="text-2xl text-[#18003c] mb-1 font-bold">{pkg.name}</p>
      <p className="font-bold mb-2 text-pink-600 text-xl">
        {/* <span className='text-gray-500 line-through'>{`Rs ${pkg.price}`}</span>  */}
        <span className='underline'>{`Rs ${pkg.price}`}</span>
      </p>
      <button 
        className="bg-[blue] mb-3 text-white py-2 px-4 rounded hover:bg-pink-600 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50"
        onClick={() => addToCart(pkg.name, pkg.price, pkg.image , pkg.Description, pkg.id)}
      >
        Purchase
      </button>
    </div>
  ))}
</div>





<div className="bg-[#18003c]  h-auto m-0 p-0">
  <div className="flex flex-col lg:flex-row  justify-center items-center h-full w-full">
    <div className="w-full lg:w-1/2 flex-shrink-0"
       >
      <img src={Pic} alt="story" className="object-fill h-[50vh] md:h-full w-full   " />
    </div>
    
    <div className="w-full lg:w-1/2 sm:h-1/2  bg-cover bg-center text-right ">
    <div className='sm:flex   sm:flex-col sm:text-xl '>
      <div className='urdu flex flex-col items-end px-8 h-auto  justify-center'>
  <h1 className='gradient-text  font-bold py-8 text-xl md:text-3xl ' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    بچوں کے لیےنت نئی پر لطف کہانیاں
  </h1>
<div className='flex flex-col justify-start'>  
  <p className='text-white my-2  ' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    <span className='inline-block'>نئے دور کے مطابق کہانیاں
    </span>
    <img className='inline-block w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-10 ml-2' src={asset10} alt="logo" />
  </p>
  
  <p className='text-white my-2 ' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    <span className='inline-block'>جدید انداز میں پرانی کہانیاں
    </span>
    <img className='inline-block w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-10 ml-2' src={asset10} alt="logo" />

  </p>
  
  <p className='text-white my-2' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    <span className='inline-block'>معیاری اور بامقصد تفریح
    </span>
    <img className='inline-block w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-10 ml-2' src={asset10} alt="logo" />

  </p>
  
  <p className='text-white my-2 ' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    <span className='inline-block'>خوبصورت لہجے میں وائس اوور
    </span>
    <img className='inline-block w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-10 ml-2' src={asset10} alt="logo" />
  </p>

  
  <p className='text-white my-2 ' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    <span className='inline-block'>ساونڈ افیکٹس کا استعمال

    </span>
    <img className='inline-block w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-10 ml-2' src={asset10} alt="logo" />
  </p>

  <p className='text-white my-2 ' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    <span className='inline-block'>محفوظ اور اشتہارات سے پاک کونٹینٹ
    </span>
    <img className='inline-block w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-10 ml-2' src={asset10} alt="logo" />
  </p>
  <p className='text-white my-2 ' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    <span className='inline-block'>آڈیو اور تحریری شکل میں کہانیاں
    </span>
    <img className='inline-block w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-10 ml-2' src={asset10} alt="logo" />
  </p>

  <p className='text-white my-2 ' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    <span className='inline-block mx-1'> سے 13 سال تک کے بچوں کے لئے مخصوص کہانیاں
    </span>
    <span>2</span>
    
    <img className='inline-block w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-10 ml-2' src={asset10} alt="logo" />
  </p>


  <p className='text-white my-2 ' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    <span className='inline-block'>ہر ہفتے نئی کہانی
    </span>
    <img className='inline-block w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-10 ml-2' src={asset10} alt="logo" />
  </p>
  <p className='text-white my-2 ' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    <span className='inline-block'>سال  میں 50 سے زائد کہانیاں
    </span>
    <img className='inline-block w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-10 ml-2' src={asset10} alt="logo" />
  </p>

</div>
<button className="bg-white text-[#18003c] text-center urdu px-8 py-3 my-8  md:my-10 lg:my-8 xl:my-10 text-sm font-bold rounded hover:bg-pink-600 hover:text-white">
        <Link to ='/FreeStory'> شروع کریں</Link>
      </button>
     
</div>
    </div>
    </div>
  </div>
  

</div>

      <div className="bg-[#18003c] flex items-center justify-center">
        <div className="p-8">
          <div className="sm:pl-12 text-center sm:pr-12 sm:m-5">
            <h1 className="text-2xl font-bold text-yellow-500 border-b-2 border-yellow-500 sm:mr-5 sm:ml-5 pb-2">
              Audio Tales: Where Imagination Meets the Power of Sound.
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center text-center text-white sm:pl-8 sm:pr-8 sm:m-4">
            <p className="sm:my-6 my-6 text-base">
              Kahanify brings the charm of storytelling to young minds. Embark
              on a captivating audio journey. Immerse in a world where stories
              come to life through the magic of sound. Our curated collection of
              audio stories is tailored for children, fostering imagination,
              language development, and a love for storytelling. Dive into a
              world of fanciful narratives, charming characters, and moralistic
              adventures, designed to spark interest and ignite the joy of
              listening in the hearts of the little ones. With Kahanify, every
              moment becomes an opportunity for young minds to explore, learn,
              and be delighted.
            </p>
            <button className="bg-white text-[#18003c] py-2 px-4 rounded hover:text-white hover:bg-pink-700 transition-transform duration-300 ease-in-out transform hover:scale-105  hover:border-light-blue-300 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50">
              <Link to="/signup"> Register Now</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>


    <footer className="bg-[#18003c] text-white py-4 border-t border-yellow-500">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-xs ">Copyright © 2024 Khanify | Powered by Kahanify</p>
        </div>
        <nav className=" flex justify-center ">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5 items-center">
            <li>
              <NavLink
                to="/Privacy"
                className="hover:text-pink-600 md:text-sm lg:text-base"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Conditions"
                className="hover:text-pink-600 md:text-sm lg:text-base"
                aria-label="Terms and Conditions"
              >
                Terms and Conditions
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Refund"
                className="hover:text-pink-600 md:text-sm lg:text-base"
                aria-label="Refund Policy"
              >
                Refund Policy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/FAQs"
                className="hover:text-pink-600 md:text-sm lg:text-base"
                aria-label="FAQ's"
              >
                FAQ's
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us"
                className="hover:text-pink-600  mr-3 md:text-sm lg:text-base"
                aria-label="Contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="mt-4 md:mt-0">
          <ul className="flex justify-center  space-x-2">
            <li>
              <Link to = 'https://www.facebook.com/KahanifyOfficial'>
              <img src={asset24} alt="Icon 1" className="h-6 w-6 hover:scale-105 mx-3 md:h-6 md:w-6" />
              </Link>
            </li>
            <li>
            <Link to = 'https://www.instagram.com/kahanifyofficial/' >

              <img src={asset25} alt="Icon 2" className="h-6 w-6 md:h-6 hover:scale-105 mx-3 md:w-6" />
              </Link>
              
            </li>
            <li>
            
              <img src={asset26} alt="Icon 3" className="h-6 w-6 md:h-6 hover:scale-105 mx-3 md:w-6" />
              
            
            </li>
            <li>
            <Link to = 'https://www.youtube.com/channel/UCnrRuc4QSzlenj_Soet80uQ'>
            
              <img src={asset27} alt="Icon 4" className="h-6 w-6 md:h-6 hover:scale-105 mx-3 md:w-6" />
              </Link>
            
            </li>
          </ul>
        </div>
      </div>
    </footer>


    </div>
    </>
  )
}

export default FreeStory


