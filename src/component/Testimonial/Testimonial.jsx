import React, { useState, useEffect } from 'react';
import { updateReview } from '../Service/api';
import { asset34 } from '../imageLoader';
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [image, setImage] = useState(asset34);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await updateReview();
        if (data && Array.isArray(data)) {
          setTestimonials(data);
          if (data.length > 0) {
            const firstReview = data[0];
            setDescription(firstReview.description || ''); // Handle empty description
            setName(firstReview.user.username || ''); // Handle empty name
            setImage(firstReview.user.profileimage ? `https://kahaniapi.realtechcrm.online/storage/app/public/${firstReview.user.profileimage}` : asset34);
          }
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const currentReview = testimonials[currentIndex];
      setDescription(currentReview.description || ''); // Handle empty description
      setName(currentReview.user.username || ''); // Handle empty name
      setImage(currentReview.user.profileimage ? `https://kahaniapi.realtechcrm.online/storage/app/public/${currentReview.user.profileimage}` : asset34);
    }
  }, [currentIndex, testimonials]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="slider-container mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#18003c] mb-4">What our Members Think About Us?</h2>
        <p className="text-[#18003c] text-sm">{description}</p>
      </div>
      {testimonials.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg font-semibold text-gray-600">No reviews available at the moment.</p>
        </div>
      ) : (
        <div className="relative flex items-center">
          <button 
            onClick={handlePrev} 
            className=" left-0 z-10 p-2 bg-gray-200 text-gray-700 rounded-full h-10 w-10 hover:bg-gray-300"
            aria-label="Previous Testimonial"
          >
            <FaArrowLeft className='self-center' />

          </button>
          <div className="w-full overflow-hidden">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-full p-2">
                  <div className="flex flex-col items-center px-2">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
                      <img
                        src={testimonial.user.profileimage ? `https://kahaniapi.realtechcrm.online/storage/app/public/${testimonial.user.profileimage}` : asset34}
                        alt="User Profile"
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setCurrentIndex(index)}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{testimonial.user.username}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={handleNext} 
            className=" right-0 z-10 p-2 bg-gray-200 text-gray-700 rounded-full h-10 w-10 hover:bg-gray-300"
            aria-label="Next Testimonial"
          >
            <FaArrowRight  className='self-center'/>
          </button>
        </div>
      )}
    </div>
  );
};

export default Testimonial;
