import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import { updateReview } from '../Service/api';
import { asset34 } from '../imageLoader';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await updateReview();
        if (data && Array.isArray(data)) {
          setTestimonials(data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-center items-center max-sm:gap-8">
          {/* <h2 className="text-4xl text-center font-bold text-gray-900 lg:text-left">Testimonials</h2> */}
         
          <h2 className="text-3xl font-bold text-center text-[#18003c] mb-4">What our Members Think About Us?</h2>
   
        </div>

        {/* Swiper Wrapper */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={28}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 28,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="group bg-white border border-solid border-gray-300 rounded-2xl p-6 transition-all duration-500 hover:border-indigo-600">
              <div className="flex items-center mb-9 gap-2 text-amber-500">
                {/* Placeholder for rating icons */}
                <svg className="w-5 h-5" viewBox="0 0 18 17" fill="currentColor" />
                <svg className="w-5 h-5" viewBox="0 0 18 17" fill="currentColor" />
                <svg className="w-5 h-5" viewBox="0 0 18 17" fill="currentColor" />
                <svg className="w-5 h-5" viewBox="0 0 18 17" fill="currentColor" />
                <svg className="w-5 h-5" viewBox="0 0 18 17" fill="currentColor" />
              </div>
              <p className="text-lg text-gray-500 leading-8 mb-9 group-hover:text-gray-800">
                {testimonial.description || 'No description provided.'}
              </p>
              <div className="flex items-center gap-5">
                <img
                  className="rounded-full w-14 h-14"
                  src={testimonial.user.profileimage ? `https://kahaniapi.realtechcrm.online/storage/app/public/${testimonial.user.profileimage}` : asset34}
                  alt="avatar"
                />
                <div className="grid gap-1">
                  <h5 className="text-gray-900 font-medium group-hover:text-indigo-600">
                    {testimonial.user.username || 'Anonymous'}
                  </h5>
                  {/* <span className="text-sm leading-6 text-gray-500">{testimonial.user.position || 'Position'}</span> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
