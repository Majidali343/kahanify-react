
import { useState, useEffect, useRef } from 'react';
import { getLink } from '../Service/api';

function YouTube() {
  const containerRef = useRef(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getLink();
        setLinks(response); 
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = 'paused';
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.animationPlayState = 'running';
    }
  };

  return (
    <div className="overflow-hidden relative">
      <div
        ref={containerRef}
        className="flex whitespace-nowrap p-4 space-x-6 animate-scroll"
        style={{ scrollBehavior: 'smooth' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {[...links, ...links].map((link) => (
          <div
            key={link.id} 
            className="flex-shrink-0 bg-gray-100 rounded shadow-xl overflow-hidden w-80 mx-8 h-96"
          >
            <iframe
              className="h-[80%] w-full"
              src={link.embed_link}
              title={link.title} 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-900">{link.title}</h2>
            </div>
          </div>
        ))}
      </div>

      <style >{`
        .animate-scroll {
          animation: scroll 20s linear infinite;
          animation-play-state: running; /* Ensure the animation starts as running */
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export default YouTube;
