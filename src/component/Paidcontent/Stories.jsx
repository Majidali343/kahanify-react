import React, { useState, useEffect } from 'react';
import { asset3 } from '../imageLoader';
import { Link } from 'react-router-dom';
import StarRating from '../home/StarRating'; 
import { allStories, favouritestories } from '../Service/api';
import SearchBar from '../SearchBar/SearchBar'; 
import Loader from '../loader/Loader';
import { FaFire } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { TiStopwatch } from "react-icons/ti";
import InfiniteScroll from 'react-infinite-scroll-component';
import Load from '../../assets/Loader.gif'

const Stories = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('default');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Determine the number of cards to show per page based on screen size
  const getCardsPerPage = () => {
    const width = window.innerWidth;
    if (width >= 1024) return 9; 
    if (width >= 768) return 6;  
        return 6;   };

  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(getCardsPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const response = await allStories();
        if (response && response.data) {
          setData(response.data);
          setFilteredData(response.data);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStories();
  }, []);

  const fetchFavourite = async () => {
    setLoading(true);
    try {
      const response = await favouritestories();
      if (response && response.data) {
        setFilteredData(response.data);
        // setHasMore(false);
      } else {
        setFilteredData([]);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let results = data.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filter === 'Latest') {
      results = results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (filter === 'Favorite') {
      fetchFavourite();
    } else if (filter === 'Popular') {
      results = results.sort((a, b) => b.views - a.views);
    }

    setFilteredData(results);
    setCurrentIndex(0);
    if (filter !== 'Favorite') {
      setHasMore(results.length > cardsPerPage);
    } else {
      setHasMore(false); 
    } 
  }, [searchQuery, data, filter]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const loadMoreData = () => {
    setCurrentIndex(prevIndex => {
      if (prevIndex + cardsPerPage < filteredData.length) {
        return prevIndex + cardsPerPage;
      } else {
        setHasMore(false);
        return prevIndex;
      }
    });
  };  

  const hasResults = filteredData.length > 0;
  const hasSearchResults = searchQuery && hasResults;

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[90vh] w-full">
          <Loader />
        </div>
      ) : (
        <div className="p-4">
          <SearchBar onSearch={handleSearch} />
        
          <div className='flex justify-center pb-3 md:pb-7 items-center md:space-x-28 space-x-3 sm:space-x-3'>
            <div 
              className={`cursor-pointer flex flex-col justify-center items-center ${filter === 'default' ? 'border-b-4 border-pink-500' : ''}`}
              onClick={() => handleFilterChange('default')}
            >
              <AiFillLike className='text-blue-400 h-6 w-6 md:h-14 md:w-14' />
              <h1 className='font-bold'>For You</h1>
            </div>
            <div 
              className={`cursor-pointer flex flex-col justify-center items-center ${filter === 'Favorite' ? 'border-b-4 border-pink-500' : ''}`}
              onClick={() => handleFilterChange('Favorite')}
            >
              <FaHeart className='text-red-600 h-6 w-6 md:h-14 md:w-14' />
              <h1 className='font-bold'>Favorite</h1>
            </div>
            <div 
              className={`cursor-pointer flex flex-col justify-center items-center ${filter === 'Popular' ? 'border-b-4 border-pink-500' : ''}`}
              onClick={() => handleFilterChange('Popular')}
            >
              <FaFire className='text-purple-600 h-6 w-6 md:h-14 md:w-14' />
              <h1 className='font-bold'>Popular</h1>
            </div>
            <div 
              className={`cursor-pointer flex flex-col justify-center items-center ${filter === 'Latest' ? 'border-b-4 border-pink-500' : ''}`}
              onClick={() => handleFilterChange('Latest')}
            >
              <TiStopwatch className='text-blue-900 h-6 w-6 md:h-14 md:w-14' />
              <h1 className='font-bold'>Recent</h1>
            </div>
          </div>
          
          {hasSearchResults || searchQuery === '' ? (
  <InfiniteScroll
  dataLength={filteredData.slice(0, currentIndex + cardsPerPage).length}
  next={loadMoreData}
  hasMore={hasMore}
  loader={
    <div className='flex justify-center items-center'>
    <img src={Load} alt="Loading..." className="w-10 h-10" />
  </div>}
  endMessage={<p className="text-gray-500 text-center">No more stories to load</p>}
>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-2 md:mx-6 gap-4">
    {filteredData.slice(0, currentIndex + cardsPerPage).map(card => (
      <Link key={card.kahani_id} to={`/kahani/${card.kahani_id}`}>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col mx-4 p-4">
          <img 
            src={`https://kahaniapi.realtechcrm.online/storage/${card.image}`} 
            alt="story" 
            className="w-full h-full object-cover mb-4" 
          />
          <h2 className="text-white text-xs">{card.created_at}</h2>
          <h3 className="text-xl font-semibold text-right mb-2">{card.title}</h3>
          <p className="text-gray-600 mb-2 text-right">{card.duration}</p>
          <div>
            <div
              className="xl:bg-contain bg:cover bg-no-repeat flex justify-between text-black p-2 rounded cursor-pointer"
              style={{ backgroundImage: `url(${asset3})`, width: '100%', height: '40px' }}
            >
              <button className="block rounded border border-black mx-12 text-center text-xs p-1">3+</button>
              <p className="block text-gray-500 ">{card.views}</p>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <StarRating 
              rating={card.average_rating} 
            />
            <p className='mx-3 text-gray-400'>{Number(card.average_rating).toFixed(1)}</p>
          </div>
        </div>
      </Link>
    ))}
  </div>
</InfiniteScroll>
          ) : (
            <p className="text-gray-500 mt-8 font-bold  text-center min-h-[50vh]">{searchQuery ? 'No search results found!' : 'No stories available!'}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Stories;
