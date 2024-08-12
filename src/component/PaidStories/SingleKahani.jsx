import React, { useEffect, useState } from 'react';
import Singleplayer from './Singleplayer';
import { useParams } from 'react-router-dom';
import { singleStory } from '../Service/api';
import StarRating from '../home/StarRating';
import { Link } from "react-router-dom";
import "../Css/skahani.css";
import { getCurrentUser, postrating } from '../Service/api';
import { asset34 } from '../imageLoader';

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
  const [name, setName] = useState('');
  const [profileimage, setProfileimage] = useState(asset34);
  const [rating, setRating] = useState(0); 

  const fetchStories = async () => {
    try {
      const response = await singleStory(id);
      console.log(response.data);
      setAudio(response.data.audio);
      setImage(response.data.image);
      setViews(response.data.views);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setComments(response.data.comments || []); 
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getCurrentUser();
        console.log(response); 

        if (response && response.user) {
          const user = response.user; 
          console.log(user); 
          if (user.username) {
            console.log(user.username); 
            setName(user.username);    
          }
          if (user.profileimage == null) {
            setProfileimage(asset34);
          } else {
            setProfileimage(user.profileimage);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleCancel = () => {
    setComment('');
    setIsInputFocused(false);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim() === '') return;

    const newComment = {
      id: new Date().getTime(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      text: comment
    };

    setComments([newComment, ...comments]);
    setComment('');
    setIsInputFocused(false);
  };

  const handleRating = async (newRating) => {
    try {
      setRating(newRating); 
      const rate = {
        kahani_id: id, 
        rating: newRating
      };
      await postrating(rate);
    } catch (error) {
      console.error('Error posting rating:', error);
    }
  };
  
  return (
    <div className='bg-[#18003c]'>
      <div>
        <Singleplayer
          audioSrc={`https://kahaniapi.realtechcrm.online/storage/${audio}`}
          imageSrc={`https://kahaniapi.realtechcrm.online/storage/${image}`}
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
              <article className="text-base article bg-[#18003c] h-[60vh] overflow-scroll overflow-x-auto w-full rounded-lg border-t border-gray-200">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-6 ">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm font-semibold">
                          <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={profileimage}
                            alt={name}
                          />
                          {name}
                        </p>
                        <p className="text-sm">
                          <time dateTime={`${comment.date}T${comment.time}`} title={`${comment.date}, ${comment.time}`}>
                            {comment.date} {comment.time}
                          </time>
                        </p>
                      </div>
                    </footer>
                    <p className="text-gray-500">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </article>
            )}
          </div>
        </section>
      </div>
      <div className="flex justify-center flex-col items-center p-4 ">
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
//axois Error