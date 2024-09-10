// import React, { useState, useEffect, useRef } from 'react';

// function YouTube() {
//   const containerRef = useRef(null);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const container = containerRef.current;
//     const speed = 1; // Adjust the speed if needed
//     let animationFrameId;
 
//     const animate = () => {
//       if (container && !isHovered) {
//         container.scrollLeft += speed;
//         if (container.scrollLeft >= container.scrollWidth / 2) {
//           container.scrollLeft = 0;
//         }
//       }
//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => cancelAnimationFrame(animationFrameId);
//   }, [isHovered]);

//   return (
//     <div
//       ref={containerRef}
//       className="flex overflow-hidden whitespace-nowrap p-4 space-x-6"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={{ scrollBehavior: 'smooth', whiteSpace: 'nowrap' }}
//     >
//       {Array.from({ length: 6 }).map((_, index) => (
//         <div
//           key={index}
//           className="flex-shrink-0 bg-gray-100 rounded shadow-xl overflow-hidden w-80 mx-8 h-96 transition-transform duration-300"
//           style={{ transition: isHovered ? 'none' : 'transform 0.5s ease' }}
//         >
//           <iframe
//             className='h-[80%] w-full'
//             src="https://www.youtube.com/embed/cxZpt9DMhb8?si=5OdrD70aSD177llT"
//             title={`YouTube video player ${index}`}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           />
//           <div className="p-4">
//             <h2 className="text-xl font-bold text-gray-900">Title {index + 1}</h2>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default YouTube;
import  { useState, useEffect, useRef } from 'react';

function YouTube() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      setContainerWidth(container.scrollWidth);
    }

    const speed = 1; // Adjust the speed if needed
    let animationFrameId;

    const animate = () => {
      if (container && !isHovered) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= containerWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, containerWidth]);

  return (
    <div
      ref={containerRef}
      className="flex overflow-hidden whitespace-nowrap p-4 space-x-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ scrollBehavior: 'smooth', whiteSpace: 'nowrap' }}
    >
      {/* Render original set of cards */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={`original-${index}`}
          className="flex-shrink-0 bg-gray-100 rounded shadow-xl overflow-hidden w-80 mx-8 h-96 transition-transform duration-300"
          style={{ transition: isHovered ? 'none' : 'transform 0.5s ease' }}
        >
          <iframe
            className='h-[80%] w-full'
            src="https://www.youtube.com/embed/cxZpt9DMhb8?si=5OdrD70aSD177llT"
            title={`YouTube video player ${index}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-900">Title {index + 1}</h2>
          </div>
        </div>
      ))}
      {/* Render duplicated set of cards */}
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={`duplicate-${index}`}
          className="flex-shrink-0 bg-gray-100 rounded shadow-xl overflow-hidden w-80 mx-8 h-96 transition-transform duration-300"
          style={{ transition: isHovered ? 'none' : 'transform 0.5s ease' }}
        >
          <iframe
            className='h-[80%] w-full'
            src="https://www.youtube.com/embed/cxZpt9DMhb8?si=5OdrD70aSD177llT"
            title={`YouTube video player ${index }`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-900">Title </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default YouTube;
