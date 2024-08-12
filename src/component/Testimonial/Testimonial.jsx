import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { updateReview } from '../Service/api';
import { asset34 } from '../imageLoader';

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
            setDescription(firstReview.description);
            setName(firstReview.user.name);
            setImage(firstReview.user.profileimage || asset34);
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
      setDescription(currentReview.description);
      setName(currentReview.user.name);
      setImage(currentReview.user.profileimage || asset34);
    }
  }, [currentIndex, testimonials]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    afterChange: index => setCurrentIndex(index % testimonials.length),
    focusOnSelect: true
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#18003c] mb-4">What our Members Think About Us?</h2>
        <p className="text-[#18003c] text-sm">
        {description}
        </p>
      </div>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} >
            <div className={`flex justify-center transform transition-transform duration-500 `}>
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                   src={testimonial.user.profileimage || asset34}
                  alt="User Profile"
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setCurrentIndex(index)}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="text-center mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
        {name}
        </h3>
      </div>
    </div>
  );
};

export default Testimonial;
