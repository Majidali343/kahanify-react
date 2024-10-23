import { useState, useEffect } from 'react';
import { getLink } from '../Service/api';
import Loader from '../loader/Loader';

const YouTube = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await getLink();
                setLinks(response);
            } catch (error) {
                console.error('Failed to fetch videos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    // Update the window width on resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePrev = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === 0 ? links.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === links.length - 1 ? 0 : prevIndex + 1
        );
    };

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

    return (
        <div className="relative">
            <div className="overflow-hidden w-full max-w-[65rem] mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader />
                    </div>
                ) : links.length === 0 ? (
                    <p className="text-center text-gray-500">No videos available at the moment.</p>
                ) : (
                    <div
                        className="pt-10 flex self-center h-[500px] transition-transform duration-500"
                        style={{
                            transform: `translateX(-${currentReviewIndex * translatePercentage}%)`,
                            display: 'flex',
                        }}
                    >
                        {links.map((link, index) => (
                            <div key={link.id} className="  flex-shrink-0 mx-5  w-[300px] md:h-[600px]   h-[300px] ">
                                <iframe
                                    className="h-full w-full"
                                    src={link.embed_link}
                                    title={link.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    frameBorder="0"
                                    style={{ aspectRatio: '1 / 1' }} 
                                />
                                <div className="p-4   ">
                                    <h2 className="text-xl  font-bold text-gray-700">{link.title}</h2>
                                </div>
                            </div>
                        ))}
                    


                    </div>
                )}
            </div>

            {!loading && links.length > 0 && (
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between ">
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
            )}
        </div>
    );
};

export default YouTube;
