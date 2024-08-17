import React, { useEffect, useState } from 'react';
import Singleplayer from './Singleplayer';
import { useParams } from 'react-router-dom';
import { singleStory } from '../Service/api';
import StarRating from '../home/StarRating';
import { Link } from "react-router-dom";
import "../Css/skahani.css";
import { postrating, sendcomment, updatecomments , veiws} from '../Service/api';
import { asset34 } from '../imageLoader';
import { Helmet } from 'react-helmet';


function SingleKahani() {
  const param = useParams();
  const id = param.id;
  const [data, setData] = useState(null);
  const [audio, setAudio] = useState();
  const [image, setImage] = useState();
  const [views, setViews] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [comments, setComments] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const fetchStories = async () => {
    try {
      const response = await singleStory(id);
      const storyData = response.data;
      setAudio(storyData.audio);
      setImage(storyData.image);
      setViews(storyData.views);
      setTitle(storyData.title);
      setDescription(storyData.description);
      setComments(storyData.comments || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [id]);

  const fetchView = async () => {
    try {
      const response = await veiws(id);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  useEffect(() => {
    fetchView();
    }, [id]);


  const handleFocus = () => setIsInputFocused(true);
  const handleBlur = () => setIsInputFocused(false);
  const handleCancel = () => {
    setComment('');
    setIsInputFocused(false);
  };

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleSubmit = async () => {
    try {
      const commentData = { kahani_id: id, text: comment };
      await sendcomment(commentData);
      setComment(''); 
      setIsInputFocused(false); 
      
      
      await fetchStories();
      const response = await updatecomments(id);
      setComments(response || []);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await updatecomments(id);
        setComments(response || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    if (id) { 
      fetchComments();
    }
  }, [id]);
  

  const handleRating = async (newRating) => {
    try {
      setRating(newRating);
      const rate = { kahani_id: id, rating: newRating };
      await postrating(rate);
    } catch (error) {
      console.error('Error posting rating:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className='bg-[#18003c]'>
         <Helmet>
    <title>Amazing Story - Engaging Storytelling with Audio | Kahanify</title>
    <meta name="description" content="Listen to an engaging amazing story with audio, perfect for relaxing or entertainment. Explore more stories on Kahanify." />
    <meta name="keywords" content="Amazing story, audio story, storytelling, entertainment, relaxation" />
    <meta property="og:title" content="Amazing Story - Engaging Storytelling with Audio |Kahanify" />
    <meta property="og:description" content="Listen to an engaging Amazing story with audio, perfect for relaxing or entertainment. Explore more stories on Kahanify." />
    <meta property="og:url" content="https://Kahanify.com/Amazingstory" />
    <meta property="og:type" content="website" />
  </Helmet>
   
      <div>
        <Singleplayer

          id={id}
          audioSrc={`http://127.0.0.1:8000/storage/${audio}`}
          imageSrc={`http://127.0.0.1:8000/storage/${image}`}
          viewCount={views}
          title={title}
          description={description}
        />
      </div>
      <div>
        <section className="bg-[#18003c] text-[#ffffff] py-8 lg:py-16 antialiased">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold">Comments ({comments.length})</h2>
            </div>
            <form className="mb-6">
              <div className="py-2 px-4 mb-4 bg-[#18003c] rounded-lg rounded-t-lg border border-gray-200">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea
                  id="comment"
                  rows="6"
                  value={comment}
                  onChange={handleCommentChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="px-0 w-full text-sm text-[#ffffff] border-0 focus:ring-0 focus:outline-none bg-[#18003c]"
                  placeholder="Write a comment..."
                  required
                />
              </div>
              <div className='m-3 flex justify-end'>
                <button
                  type="button"
                  className="bg-[#18003c] text-white m-3 font-bold py-2 px-4 rounded hover:bg-pink-600 hover:text-white transition-colors"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-white text-[#18003c] m-3 font-bold py-2 px-4 rounded hover:bg-pink-600 hover:text-white transition-colors"
                  onClick={handleSubmit}
                >
                  Comment
                </button>
              </div>
            </form>
            {comments.length > 0 && (
              <article className="text-base article bg-[#18003c]  overflow-scroll overflow-x-auto w-full rounded-lg border-t border-gray-200">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-6">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm font-semibold">
                          <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={`http://127.0.0.1:8000/storage/app/public/${comment.user.profileimage}` || asset34}
                            alt={comment.user.username || 'Anonymous'}
                          />
                          {comment.user.username || 'Anonymous'}
                        </p>
                        <p className="text-sm">
                          {formatDate(comment.created_at)}
                        </p>
                      </div>
                    </footer>
                    <p className="text-gray-500">
                      {comment.comment}
                    </p>
                  </div>
                ))}
              </article>
            )}
          </div>
        </section>
      </div>
      <div className="flex justify-center flex-col items-center p-4">
        <h1 className='text-xl text-center text-yellow-500 m-3'>Rate this Story</h1>
        <div>
          <StarRating
            rating={rating}
            onChange={handleRating}
          />
        </div>
        <div>
        <button 
            className="bg-white text-[#18003c] mt-6 font-bold py-2 px-4 rounded-md hover:bg-pink-600 hover:text-white transition-colors"
          >
            <Link to='/Paidcontent'>
              More Stories
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleKahani;
