import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const AudioPlayer = ({ audioSrc, imageSrc, viewCount }) => {
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

  const handleLike = () => {
    setLike(!like);
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
        <div className="text-white p-4 rounded-lg shadow-lg w-full max-w-lg">
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

          <div className="flex justify-between items-center mb-4 sm:p-4  rounded-lg shadow-md">

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
          <FontAwesomeIcon icon={faBackward} />
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
          <FontAwesomeIcon icon={faForward} />
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
              <FontAwesomeIcon icon={faEye} className="text-xl mx-2" />
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
              بھیڑیا اور چالاک بکری
            </h1>
            <p className="text-xl">
              ایک چرواہا روز اپنی بکریوں کو چرانے لے جاتا دن بھر گھومنے کے
              باوجود اس کی بکریوں کا پیٹ نہ بھرتا۔ کیونکہ اس گھر کے قریب کی ساری
              گھاس بکریاں اور دوسرے جانور پہلے ہی کھا چکے تھے۔ اس کے گھر سے کچھ
              فاصلے پر ایک نہر تھی جہاں وہ روز اپنی بکریوں کو پانی پلانے لے جاتا
              ۔ نہر کے پار ایک گھنا جنگل تھا جو کہ بہت ہی ہرا بھر تھا اور بکریوں
              کے چرنے کے ل وہاں بہت ہی زبر دست اور رسیلی گھاس بھی تھی۔ بکریوں کا
              اس گھاس کو دیکھ کر بہت جی للچا تا اور وہ سوچتیں ؛ کاش ہم وہ رس
              بھری لمبی لمبی گھاس کھا کر اپنا پی بھر سکیں۔ لیکن وہ نہر کے پار اس
              لئے نہیں جاسکتی تھیں کیونکہ وہاں گھنے جنگل میں ایک بہت ہی خونخوار
              بھیڑ یا رہتا تھا اور اکثر رات کو اس کی خوفناک آواز آیا کرتی ؛ ڈر
              کے مارے بکریوں کی تو جان ہی نکل جاتی ۔ ان میں سے ایک بکری بہت
              عقلمند تھی اور اکثر دوسری بکریوں سے کہتی کہ اس بھیٹر X کی آواز سے
              ہی تمہارا دم نکل جاتا ہے اگر کسی دن وہ سامنے آگیا تو کیا کرو گی ۔
</p>             <p>
              یہ سوچ کر سب بکریاں اور بھی سہم جاتیں۔ ایک دن اس عقلمند بکری کو
              بہت زیادہ بھوک لگی ہوئی تھی اور نہر کے پارا سے مزے مزے کی گھاس بھی
              نظر آرہی تھی اس نے سوچا کہ ابھی تو دن کا وقت ہے بھیڑیا تو رات کو
              آتا ہے تو کیوں نہ چپکے سے نہر کے پار ہو جاؤں اور جلدی جلدی پیٹ بھر
              کر واپس آجاوں ۔ 
              </p> <p>
                               بکری نے آہستہ آہستہ اپنے آپ کو گلے سے الگ کیا اور
              چرواہے سے نظر بچا کر نہر میں اتر گئی۔ ٹھنڈے ٹھنڈے پانی سے اسے
              گدگدی سی ہونے لگی لیکن اس نے خاموشی سے برداشت کیا اور آہستہ سے
              تیرتی ہوئی شہر کے پار پہنچ گئی۔ اتنی ساری مزے مزے کی لمبی اور
              رسیلی گھاس میں آکر اس کی تو خوشی کی انتہا نہیں تھی۔ بھوک بھی بہت
              شدید لگ رہی تھی اس نے آؤ دیکھا نہ تاؤ بس پل پڑی اور گھاس چرنے میں
              مشغول ہوگئی ۔ 
              </p>
<p>
              آج تو اس کا جی ہی نہیں بھر رہا تھا اچھی سے اچھی گھاس
              کی لالچ میں وہ بہت دور نکل آئی اور اتنی گھاس کھائی کہ اب اس سے چلا
              ہی نہیں جارہا تھا۔ اس نے سوچا ابھی تو شام ہونے میں کچھ وقت باقی ہے
              چلو تھوڑی دیر ستا لیتے ہیں پھر واپس چلے جائیں گے۔ اب جو بکری سوئی
              تو بہت دیر تک سوتی رہی ۔ اچانک اس کی آنکھ کھلی تو ہر طرف اندھیرا
              ہی اندھیرا پھیلا ہوا تھا۔ وہ تھوڑی پریشان ہوئی کہ اب میں گھر واپس
              کیسے جاؤں گی۔ اس نے بہت کوشش کی کہ واپسی کا راستہ تلاش کرلے مگر وہ
              مزید بھٹک گئی ۔ آخر کار اس نے فیصلہ کیا کہ چلو رات کسی نہ کسی طرح
              چھپ کر گزار لیتی ہوں صبح سویرے راستہ تلاش کر واپس گھر چلی جاؤں گی
              ۔ قریب ہی اسے ایک غار نظر آئی اور وہ بے ڈھڑک غار میں چلی گئی۔ غار
              اندر سے خالی تھی اور وہ بڑے آرام سے بیٹھ گئی ۔ اتنے میں اسے دور
              کہیں سے بھیرا * کی خوفناک آواز آئی۔ اسے یاد آیا کہ میں تو اسی جنگل
              میں ہوں جہاں یہ خونخوار بھیڑیا رہتا ہے جس کی آواز سن کر ہی سب کی
              جان نکل جاتی تھی۔ اس نے خود سے کہا وہاں تو تم بڑی بڑی باتیں بناتی
              تھیں سو چوا گر آج واقعی وہ تمہارے سامنے آگیا تو کیا کرو گی ۔ اس
              خیال نے اس جسم میں خوف کی لہر سی دوڑا دی ۔ بھیڑ کی آواز جو پہلے
              دور سے آرہی تھی آہستہ آہستہ قریب آنے لگی اور پھر وہ اتنے قریب آگئی
              جیسے وہ بلکل غار کے باہر سے آرہی ہو۔ بکری بلکل خاموشی سے دبک کر
              غار کے ایک کونے میں بیٹھ گئی ۔ اتنے میں بھیڑ یا غار کے اندر ہی
              آگیا اسنے جو بکری کو دیکھا تو خوفناک سی ہنسی ہنس کر بولا ۔ واہ رے
              میرے ربا میں سارے جنگل میں شکار کے ل خوار ہو رہا ہوں اور تو نے
              اتنی موٹی تازی بکری میری غار میں ہی بھیج دی ہے۔ بکری نے اپنے آپ کو
              کوسا کہ تجھے بھی چھپنے کے لئے یہی جگہ ملی تھی خود ہی چل کر اس
              خوفناک بھیرہ * کی غار آ گئی۔ بھیڑ کی سرخ سرخ خونخوار آنکھیں ، تیز
              نوکیلے دانت اور منہ سے لٹکتی تیز دھاری زبان دیکھ کر بکری کا تو دم
              ہی نکل گیا۔ پھر بکری نے تھوڑی ہمت کی اور سوچا کہ جان بچانے کا کوئی
              تو حیلہ کیا جائے۔ جیسے ہی بھیڑ یا اس کی طرف بڑھا تو بکری نے آواز
              کو تھوڑا بھاری کیا اور اپنے سینگوں کو سیدھا کر کے بولی۔ چلو اچھا
              ہوا تم خود ہی یہاں آگئے ۔ آج میں نے دس چیتے اور پانچ شیر شکارک
              ہیں۔ لیکن کوئی بھی بھیڑیا نہیں ملا کہ میں اسے کھا سکوں ۔ بھیڑیا
              وہیں رک گیا اور سوچنے لگا کہیں یہ بکری سچ ہی نہ بول رہی ہو ۔ بکری
              نے موقع دیکھا اور گرجدار آواز میں بولی تم بھاگنے کا سوچنا بھی مت۔
              اب بھیڑیا جو گھبرا کے کچھ پیچھے کو ہٹ رہا تھا ر بک کرو ہیں بیٹھ
              گیا۔ اور گڑ گڑا کر درخواست کرنے لگا میں بہت گندہ ہوں اگر آپ اجازت
              دیں تو میں نہر میں نہا کر آجاؤں پھر آپ مجھے شوق سے کھا لینا ۔ بکری
              نے کہا اچھا جاؤ مگر یا درکھنا مجھے دھوکہ دے کر بھاگنے والا کبھی
              بچتا نہیں۔ بھیڑ * کو جیسے ہی اجازت ملی وہ سر پر پیر رکھ کر دوڑ
              گیا۔ بکری نے سکون کا سانس اور جان بیچنے پر اللہ کا شکر ادا کیا۔ سر
              پٹ سر دوڑتے ہو بھیڑے کو رستے میں ایک گیدڑ ملا ۔
              </p>
                         <p>
               اس نے پوچھا اتنی
              تیزی سے کہاں بھاگے جارہے ہو۔ بھیڑ نے جلدی جلدی گیدڑ کو ساری بات
              بتادی۔ گیدڑ سمجھ گیا کہ بکری نے اسے بیوقوف بنایا ہے۔ گیدڑ ہنسا۔۔۔
              آؤ بھی بھیرہ * آج تو تمہاری طرف سے دعوت ہو گئی ، دونوں مل کر
              اڑائیں گے ۔ ارے بکری بھی کبھی شیر چیتوں کا شکار کر سکتی ہے یہ کہہ
              کر گیدڑا اسے ساتھ واپس لے آیا۔ اب جو بکری نے دونوں کو ساتھ آتے
              دیکھا۔ تو اونچی آواز میں بولی ۔ ارے او گیدڑ تو نے بہت اچھا کام کیا
              کہ میرے مجرم کو پکڑ لایا۔ اب میں تجھے منہ مانگا انعام دوں گی ۔
              گیدڑ یہ سن کر بکہ بکہ رہ گیا۔ جبکہ بھیڑیا جو پہلے ہی ڈرا ہوا تھا ،
              یہ سمجھا کہ گیدڑ بھی بکری کے ساتھ ملا ہوا ہے اور اسے بہلا پھسلا کر
              دوبارہ واپس لے آیا ہے۔ بس اس نے فورا گیدڑ پر حملہ کر کے اسے ماردیا
              اور پہلے سے دوگنی رفتار میں وہاں سے دوڑ گیا۔ اور دوبارہ مڑ کر کبھی
              واپس نہیں آیا۔ اگلے دن صبح صبح بکری واپس اپنے گھر پہنچی اور گلے
              میں سب کو گزری شب کا احوال سنایا تو سب بہت خوش ہو اور اس کی حاضر
              دماغی کی بہت تعریف کی ۔ کیونکہ اب وہ سب بے خوف ہو کر نہر کر پار کی
              گھاس سے اپنا پیٹ بھر سکتے تھے۔ دیکھا بچو، ہمت و حوصلہ رکھنے اور
              حاضر دماغی سے بڑی سے بڑی مشکل حل ہو جاتی ہے
            </p>
          </>
        )}
      </div>

      
    </div>
  );
};

export default AudioPlayer;
