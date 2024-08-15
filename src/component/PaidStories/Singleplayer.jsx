import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {asset38, asset39 ,asset40} from '../imageLoader' ;
import {likekahani , isfavourite} from '../Service/api';
import {
  faPlay,
  faPause,
  faHeart,
  faBackward,
  faForward,
  faVolumeUp,
  faVolumeMute,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const Singleplayer = ({ id ,audioSrc, imageSrc, viewCount, title, despcription }) => {

  
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [like, setLike] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showStory, setShowStory] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const audio = audioRef.current;
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    checkfavourite();

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
    
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.volume = volume;
    }
  }, [playbackRate, volume]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    audioRef.current.currentTime -= 10;
  };

  const handleForward = () => {
    audioRef.current.currentTime += 10;
  };

  const checkfavourite = async () => {
    try {
      
      const response = await isfavourite(id);
      setLike(response.liked)
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const fetchView = async () => {
    try {
      
      const response = await likekahani(id);
      console.log(response)
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const handleLike = () => {
    setLike(!like);
    fetchView();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const toggleStory = () => {
    setShowStory(!showStory);
  };

  const increasePlaybackSpeed = () => {
    setPlaybackRate((prevRate) => Math.min(prevRate + 0.5, 2));
  };

  const decreasePlaybackSpeed = () => {
    setPlaybackRate((prevRate) => Math.max(prevRate - 0.5, 0.5));
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const muteVolume = () => {
    setVolume(0);
  };

  const isMuted = volume === 0;

  return (
    <div className="bg-[#18003c] w-full h-full p-0 m-0">
      <div className="flex flex-col items-center justify-center p-0 m-0">
        <div className="text-white p-4 rounded-lg  w-full max-w-lg">
          <div className="text-center mb-4">
            <img
              src={imageSrc}
              alt="Audio Thumbnail"
              className="mx-auto w-full h-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => (audioRef.current.currentTime = e.target.value)}
              className="w-full mx-2"
            />
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex justify-between items-center mb-4 sm:p-4  rounded-lg ">

      <div className="flex items-center sm:mb-4 md:mb-0">
        <button
          onClick={decreasePlaybackSpeed}
          className="text-sm sm:text-lg md:text-xl mx-2"
          aria-label="Decrease Playback Speed"
        >
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <span className="mx-2 text-sm sm:text-lg md:text-xl">{playbackRate}x</span>
        <button
          onClick={increasePlaybackSpeed}
          className="text-sm sm:text-lg md:text-xl mx-2"
          aria-label="Increase Playback Speed"
        >
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
      <div className="flex justify-center items-center sm:mb-4 md:mb-0">
        <button
          onClick={handleRewind}
          className="text-sm sm:text-lg md:text-xl mx-2"
          aria-label="Rewind 10 seconds"
        >
<img src={asset38} alt="back" className="h-10 w-8" />

          {/* <FontAwesomeIcon icon={faBackward} /> */}
        </button>
        <button
          onClick={togglePlayPause}
          className="text-sm sm:text-lg md:text-xl mx-2"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
        <button
          onClick={handleForward}
          className="text-sm sm:text-lg md:text-xl mx-2"
          aria-label="Forward 10 seconds"
        >
<img src={asset39} alt="back" className="h-10 w-8" />

          {/* <FontAwesomeIcon icon={faForward} /> */}
        </button>
      </div>

      <div className="flex items-center">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-12 sm:w-24 sm:mx-2"
          aria-label="Volume"
        />
        <button
          onClick={muteVolume}
          className="text-sm sm:text-lg md:text-xl mx-2"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <FontAwesomeIcon icon={faVolumeMute} />
          ) : (
            <FontAwesomeIcon icon={faVolumeUp} />
          )}
        </button>
      </div>
    </div>
    <div className="flex justify-between items-center ml-4 mb-4">
            <div>
              <button
                onClick={handleLike}
                className={`text-xl ${like ? "text-red-500" : "text-gray-500"}`}
                aria-label="Like"
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>{" "}
            <div className="flex items-center">
<img src={asset40} alt="back" className="h-10 w-10 mr-2" />
              
              {/* <FontAwesomeIcon icon={faEye} className="text-xl mx-2" /> */}
              <span>{viewCount}</span>
            </div>
          </div>

          <audio ref={audioRef} src={audioSrc} />
        </div>
      </div>

      <div className="border-b-2 mx-0 border-yellow-500 p-0">
        <h1 className="text-sm my-8 text-center text-white">
          Wanna Read it?{" "}
          <button
            onClick={toggleStory}
            className="text-yellow-500 hover:underline"
          >
            Click Here
          </button>
        </h1>
      </div>
      <div
        className={`text-white px-8 mx-8 pt-8 text-right read-story transition-opacity duration-500 ease-in-out ${
          showStory ? "opacity-100" : "opacity-0"
        }`}
        style={{ fontFamily: "Noto Nastaliq Urdu, sans-serif" }}
      >
        {showStory && (
          <>
            <h1 className="text-3xl font-bold py-4 pb-4">
              {title}
            </h1>
            <p className="leading-normal">
           {despcription}  
            </p>
          </>
        )}
      </div>

      
    </div>
  );
};

export default Singleplayer;
