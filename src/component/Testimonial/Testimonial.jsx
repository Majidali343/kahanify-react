
import  { useState, useEffect } from 'react';
import { asset34 } from '../imageLoader';
import { updateReview } from '../Service/api';
import Loader from '../loader/Loader';
const Testimonial = () => {
    const [reviews, setReviews] = useState([]);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const data = await updateReview();
                if (data && Array.isArray(data)) {
                    setReviews(data);
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }finally{
                setLoading(false)
            }
        };

        fetchReviews();
    }, []);

    const handlePrev = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
    };

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Update the window width on resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    
    const getReviewsToShow = () => {
        if (windowWidth < 400) {
            return 1; 
        } else if (windowWidth < 850) {
            return 2; 
        } else {
            return 3; 
        }
    };

    const reviewsToShow = getReviewsToShow();
    const translatePercentage = 100 / reviewsToShow; 

    const truncateText = (text) => {
        const maxCharacters = 90; 

        if (text.length > maxCharacters) {
            return text.substring(0, maxCharacters) + '...';
        }
        return text;
    };

    const NameText = (text) => {
        const maxCharacters = 15; 

        if (text.length > maxCharacters) {
            return text.substring(0, maxCharacters) + '...';
        }
        return text;
    };
    return (
        <div className="relative">
            <div className="overflow-hidden w-full max-w-4xl mx-auto">
            <div className="mb-14 flex flex-col py-6 justify-center items-center max-sm:gap-8">
         
          <h2 className="text-3xl font-bold text-center text-[#18003c] ">What our Members Think About Us?</h2>
   
        </div>

                {/* <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${currentReviewIndex * 33.33}%)`,
                    }}
                > */}

{loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader />
                    </div>
                ) : reviews.length === 0 ? (
                    <p className="text-center text-gray-500">No reviews available at the moment.</p>
                ) : (
                

                  <div
            className="flex transition-transform duration-500"
            style={{
                transform: `translateX(-${currentReviewIndex * translatePercentage}%)`,
                display: 'flex',
            }}>
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className=" w-full  md:w-1/2 lg:w-1/3  flex-shrink-0 p-4 box-border"
                        >
                            <div className="bg-white p-6 rounded-2xl  border border-gray-200 shadow-lg text-center">
                                <img
                                src={review.user.profileimage ? `https://admin.kahanify.com/storage/app/public/${review.user.profileimage}` : asset34}

                                    alt={review.user.username}
                                    className="w-16 h-16 rounded-full mx-auto mb-4"
                                />
                                <p className="text-lg  italic mb-2 overflow-hidden h-[120px] text-ellipsis 
           display-webkit-box -webkit-box-orient-vertical -webkit-line-clamp-4">
  &quot;                             {truncateText(review.description)}&quot;
                                    {/* "{review.description}" */}
                                </p>
                                 <h3 className="mt-4 font-semibold text-xl">
                                 {NameText(review.user.username)}
                                    
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
           )}
           </div>
           {!loading && reviews.length > 0 && (
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between pt-40  xl:px-10">
                <button
                    onClick={handlePrev}
                    className="bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center focus:outline-none"
                >
                    &larr;
                </button>
                <button
                    onClick={handleNext}
                    className="bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center focus:outline-none"
                >
                    &rarr;
                </button>
            </div>
   )}     </div>
    );
};

export default Testimonial;
