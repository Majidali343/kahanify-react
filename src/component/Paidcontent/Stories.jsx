import React, { useState, useEffect } from 'react';
import { asset3 } from '../imageLoader';
import { Link } from 'react-router-dom';
import StarRating from '../home/StarRating'; 
import { allStories , favouritestories} from '../Service/api';
import SearchBar from '../SearchBar/SearchBar'; 
import Loader from '../loader/Loader';
const Stories = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('default'); 
  const cardsPerPage = 9;
  const [loading, setLoading] = useState(false);

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
        console.log('sdkjasbdkjsadashdasjhdasldhsaldsldhsajdhkashDLKASHBCAHCBIDSHC');
        console.error('Error fetching stories:', error);
      }finally {
        setLoading(false); 
      }
    };
    
    fetchStories();
  }, []); 
  
  
  
  const fetchfavourite = async () => {
    setLoading(true);
    try {
      const response = await favouritestories();
      if (response && response.data) {
        console.log(response);
        // setData(response.data);
        setFilteredData(response.data); 
      }else{
        setFilteredData([]); 
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    }finally {
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
      fetchfavourite();
    } else if (filter === 'Popular') {
      results = results.sort((a, b) => b.views - a.views);
    }

    setFilteredData(results);
    setCurrentIndex(0); 
  }, [searchQuery, data, filter]); 

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const nextPage = () => {
    if (currentIndex + cardsPerPage < filteredData.length) {
      setCurrentIndex(currentIndex + cardsPerPage);
    }
  };

  const prevPage = () => {
    if (currentIndex - cardsPerPage >= 0) {
      setCurrentIndex(currentIndex - cardsPerPage);
    }
  };

  const hasResults = filteredData.length > 0;
  const hasSearchResults = searchQuery && hasResults;

  return (
   <div>
    {loading ?
      

        <div className="flex justify-center items-center min-h-[100vh] w-full">
      
      <Loader />
      </div>
       
     : (

    <div className="p-4">
      <SearchBar onSearch={handleSearch} />
     < div className='flex items-center justify-center'>
      <label className='font-bold bg-blue-600 text-white rounded-l-md p-2 mr-0' htmlFor="filterOption">Sort by:</label>
      <select 
        className='bg-white border border-gray-300 rounded-r-md p-2 text-gray-700'
           value={filter}
          onChange={handleFilterChange}
         >
          <option value="default">Select</option>
          <option value="Latest">Latest</option>
          <option value="Favorite">Favorite</option>
          <option value="Popular">Popular</option>
        </select>
      </div>
           {hasSearchResults || searchQuery === '' ? (
        <>
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-2 md:mx-6 gap-4">
              {filteredData.slice(currentIndex, currentIndex + cardsPerPage).map(card => (
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
                        className="bg-cover flex justify-between text-black p-2 rounded cursor-pointer"
                        style={{ backgroundImage: `url(${asset3})`, width: '100%', height: '40px', content:'contain' }}
                      >
                        <button className="block rounded border border-black mx-12 text-center text-xs p-1">3+</button>
                        <p className="block text-gray-500 mr-6">{card.views}</p>
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
            <div className="flex justify-center m-4">
              <button
                onClick={prevPage}
                disabled={currentIndex === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 mx-2"
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={currentIndex + cardsPerPage >= filteredData.length}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 mx-2"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-500 mt-2 text-center">{searchQuery ? 'No search results found!' : 'No stories available!'}</p>
      )}
    </div>   )}
    </div>
  );
};

export default Stories;
