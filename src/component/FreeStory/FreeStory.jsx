import React from 'react'
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause, faHeart, faBackward, faForward, faEye } from '@fortawesome/free-solid-svg-icons';
import { asset37 ,asset10 ,asset9 } from '../imageLoader';
import audio from '../../assets/audio/Bheriya-aur-chalaak-Bakri.mp3'
library.add(faPlay, faPause, faHeart, faBackward, faForward, faEye);
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';


function FreeStory() {
  return (
    <>
    <Helmet>
    <title>Free Story - Engaging Storytelling with Audio | Kahanify</title>
    <meta name="description" content="Listen to an engaging free story with audio, perfect for relaxing or entertainment. Explore more stories on Kahanify." />
    <meta name="keywords" content="free story, audio story, storytelling, entertainment, relaxation" />
    <meta property="og:title" content="Free Story - Engaging Storytelling with Audio |Kahanify" />
    <meta property="og:description" content="Listen to an engaging free story with audio, perfect for relaxing or entertainment. Explore more stories on Kahanify." />
    <meta property="og:image" content={asset37} />
    <meta property="og:url" content="https://Kahanify.com/freestory" />
    <meta property="og:type" content="website" />
  </Helmet>
    <div>
      <AudioPlayer
        audioSrc={audio}
        imageSrc={asset37}
        viewCount={5.6}
      />

<div class="bg-[#18003c] sm:h-[80vh] md:h-[100vh] lg:h-[80vh] xl:h-[75vh] h-auto m-0 p-0">
        <div class="flex flex-col md:flex-row h-full w-full">
          <div class="w-full md:w-1/2 sm:h-1/2 md:h-full bg-cover bg-center">
            <img src={asset9} alt="story" class="w-full h-full object-cover" />
          </div>

          <div class="w-full md:w-1/2 sm:h-1/2 md:h-full bg-cover bg-center text-right p-8">
            <div className="sm:flex sm:flex-col sm:text-xl">
              <h1
                className="text-[#ff912c] font-bold my-8 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
                style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
              >
                بچوں کے لیےنت نئی پر لطف کہانیاں
              </h1>

              <p
                className="text-white my-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
              >
                <span className="inline-block">
                  اشتہارات سے پاک محفوظ تفریح
                </span>
                <img
                  className="inline-block w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-12 xl:h-12 ml-2"
                  src={asset10}
                  alt="logo"
                />
              </p>

              <p
                className="text-white my-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
              >
                <span className="inline-block">
                  چاہے آڈیو فائل پلے کریں یا خود سنائیں
                </span>
                <img
                  className="inline-block w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-12 xl:h-12 ml-2"
                  src={asset10}
                  alt="logo"
                />
              </p>

              <p
                className="text-white my-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
              >
                <span className="inline-block">
                  بچوں کی بہترین تربیت میں مدد گار
                </span>
                <img
                  className="inline-block w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-12 xl:h-12 ml-2"
                  src={asset10}
                  alt="logo"
                />
              </p>

              <p
                className="text-white my-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
              >
                <span className="inline-block">
                  کرے اجاگر بچوں کی تخلیقی صلاحیتیں
                </span>
                <img
                  className="inline-block w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 xl:w-12 xl:h-12 ml-2"
                  src={asset10}
                  alt="logo"
                />
              </p>
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
            <p className="sm:mb-6 text-base">
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
            <button className="bg-white text-[#18003c] py-2 px-4 rounded hover:bg-pink-700 transition-transform duration-300 ease-in-out transform hover:scale-105  hover:border-light-blue-300 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50">
              <Link to="/signup"> Register Now</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default FreeStory


