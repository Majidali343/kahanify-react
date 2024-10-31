import { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 
import Modal from './Modal'; 

function AudioPlay({ audioUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

   
    

    const handleTimeUpdate = () => {
      if (audioElement.currentTime >= 40) {
        audioElement.pause();
        audioElement.currentTime = 0; // Optional: Reset the audio to the beginning
        setIsPlaying(false);
        toast.warning('Please purchase membership to listen full story');
        // setShowModal(true); 

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
      fbq('track', 'ViewContent');

    }
    setIsPlaying(!isPlaying);
  };
  const closeModal = () => setShowModal(false);

  return (
    <div className="audio-player">
      <audio ref={audioRef} controlsList="nodownload">
        <source src={`https://admin.kahanify.com/storage/${audioUrl}`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button onClick={handlePlayPause} className="play-pause-button bg-purple-950 rounded-sm px-3 py-1 text-white mb-1" >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

        {/* {showModal && (
          <Modal isOpen={showModal} onClose={closeModal}>
            <h2 className="text-lg font-semibold">Unlock the Full Story</h2>
            <p>To enjoy the entire story and explore more exciting content, simply become a member. Get access to exclusive stories, extended versions, and much more by joining today!</p>
          </Modal>
        )} */}
    </div>
  );
}

export default AudioPlay;
