import { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 

function AudioPlay({ audioUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

   
    

    const handleTimeUpdate = () => {
      if (audioElement.currentTime >= 40) {
        audioElement.pause();
        audioElement.currentTime = 0; // Optional: Reset the audio to the beginning
        setIsPlaying(false);
        toast.warning('Please purchase membership to listen full story');
        return;
      }
    };

    audioElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handlePlayPause = () => {
    const audioElement = audioRef.current;
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} controlsList="nodownload">
        <source src={`https://kahanifylaravel.kahanify.com/storage/${audioUrl}`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button onClick={handlePlayPause} className="play-pause-button bg-purple-950 rounded-sm px-3 py-1 text-white mb-1" >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      {/* You can add more custom controls like volume, progress bar, etc. */}
    </div>
  );
}

export default AudioPlay;
