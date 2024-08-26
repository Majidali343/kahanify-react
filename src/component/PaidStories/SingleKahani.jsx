import React, { useEffect, useState, useCallback } from 'react';
import Singleplayer from './Singleplayer';
import { useParams, Link, NavLink } from 'react-router-dom';
import { singleStory, getlogout, postrating, sendcomment, updatecomments, veiws,  postReply } from '../Service/api';
import Star from '../Star';
import "../Css/skahani.css";
import { asset34, asset41, asset10, asset9, asset24, asset25, asset26, asset27 } from '../imageLoader';
import { Helmet } from 'react-helmet';
import { FaRegUser, FaSortDown } from "react-icons/fa";
import Loader from '../loader/Loader';
import loadi from '../../assets/Loader.gif';

function SingleKahani() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [audio, setAudio] = useState('');
  const [image, setImage] = useState('');
  const [views, setViews] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [replyTo, setReplyTo] = useState(null); // Track which comment is being replied to
  const [replyText, setReplyText] = useState(''); // Track the text of the reply
  const [replies, setReplies] = useState({}); // Store replies by comment ID
  const [isReplying, setIsReplying] = useState(false); // Control visibility of the reply input field

  const fetchStory = async () => {
    setLoading(true);
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
      console.error('Error fetching story:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchView = async () => {
    try {
      await veiws(id);
    } catch (error) {
      console.error('Error fetching views:', error);
    }
  };

  useEffect(() => {
    fetchStory();
    fetchView();
  }, [id]);

  const fetchComments = useCallback(async () => {
    setLoadingComments(true);
    try {
      const response = await updatecomments(id);
      setComments(response);
    setReplies(response);
    console.log ('hfhfhfhihfe',response);

    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoadingComments(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id, fetchComments]);

  const handleFocus = () => setIsInputFocused(true);
  const handleBlur = () => setIsInputFocused(false);
  const handleCancel = () => {
    setComment('');
    setIsInputFocused(false);
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;
  // add loader
    try {
    const comment_id= replyTo;
    const message = replyText
      const replyData = { 
        comment_id , message
        };
      await postReply(replyData); 
      setReplyText('');
      setReplyTo(null);
      setIsReplying(false);
      await fetchComments(); 
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };
  const handleCommentChange = (e) => setComment(e.target.value);

  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      const commentData = { kahani_id: id, text: comment };
      await sendcomment(commentData);
      setComment('');
      setIsInputFocused(false);
      await fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyTo(commentId);
    setReplyText(''); // Clear any existing text in the reply input field
    setIsReplying(true); // Show the reply input field
  };
  

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

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleLogout = async () => {
    try {
      await getlogout();
      window.location.href = 'login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
      
      <div className='min-w-full bg-[#18003c]'>
        <ul className="flex justify-between align-center">
          <li>
            <Link to="/Paidcontent">
            <img src={asset41} alt="logo" className="h-24 w-24 " />
            </Link>
          </li>
          <li className="p-5">
            <div className="absolute inset-y-0 right-0 flex md:items-center items-start mt-4 sm:mt-4 md:mt-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="relative flex items-center rounded-2xl px-1 py-2 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span className="sr-only">Open user menu</span>
                  <FaRegUser className='h-8 w-5' />
                  <FaSortDown />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link to="/Member" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Membership Details
                    </Link>
                    <Link to="Order" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Order Details
                    </Link>
                    <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </li>
        </ul>
      </div>

      {loading ? <div className='flex justify-center items-center'> <Loader /> </div> :
        <Singleplayer
          id={id}
          audioSrc={`https://kahanifylaravel.kahanify.com/storage/${audio}`}
          imageSrc={`https://kahanifylaravel.kahanify.com/storage/${image}`}
          viewCount={views}
          title={title}
          description={description}
        />
      }

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
                className="bg-white text-[#18003c] m-3 font-bold py-2 flex justify-center items-center px-4 rounded hover:bg-pink-600 hover:text-white transition-colors"
                onClick={handleSubmit}
                disabled={submitLoading}
              >
                {submitLoading ? <img src={loadi} alt="load" className='h-6 w-6' /> : "Comment"}
              </button>
            </div>
          </form>
          {loadingComments ? <div className='flex justify-center items-center'> <Loader /> </div> : 
            comments.length > 0 && (
              <article className="text-base article bg-[#18003c] overflow-scroll overflow-x-auto w-full ">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-6  border-b border-gray-200">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm font-semibold">
                          <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src={comment.user.profileimage ? `https://kahanifylaravel.kahanify.com/storage/app/public/${comment.user.profileimage}` : asset34}
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
                    <div class="flex items-center mt-4 space-x-4">
            <button type="button"
        onClick={() => handleReplyClick(comment.id)}
               class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                </svg>
                Reply
            </button>
        </div>
        {/* Render reply input field */}
    {isReplying && replyTo === comment.id && (
      <div className="py-2 px-4 mb-4 bg-[#18003c] ">
        <input 
        type='text'
          
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="px-0 w-full text-sm text-[#ffffff] border-b border-gray-200 focus:ring-0 focus:outline-none bg-[#18003c]"
          placeholder="Write a reply..."
          required
        />
        <div className='m-3 flex justify-end'>
          <button
            type="button"
            className="bg-[#18003c] text-white m-3 font-bold py-2 px-4 text-sm rounded hover:bg-pink-600 hover:text-white transition-colors"
            onClick={() => {
              setReplyText('');
              setReplyTo(null);
              setIsReplying(false);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-white text-[#18003c] m-3 font-bold py-2 flex justify-center text-sm items-center px-4 rounded hover:bg-pink-600 hover:text-white transition-colors"
            onClick={handleReplySubmit}
          >
            {submitLoading ? <img src={loadi} alt="load" className='h-6 w-6' /> : "Reply"}
          </button>
        </div>
      </div>
    )}
     {/* Render replies */}
     {comment.replies.length > 0 && (
      <div className="ml-8 mt-4">
        {comment.replies.map((reply) => (
          <div key={reply.id} className="py-4 ">
            <p className="text-sm font-semibold">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={reply.user.profileimage ? `https://kahanifylaravel.kahanify.com/storage/app/public/${reply.user.profileimage}` : asset34}
                alt={reply.user.username || 'Anonymous'}
              />
              {reply.user.username || 'Anonymous'}
            </p>
            <p className="text-gray-500">{reply.message}</p>
            <p className="text-xs text-gray-400">{formatDate(reply.created_at)}</p>
          </div>
        ))}
      </div>
    )}
                 </div>
                ))}
              </article>
            )}
        </div>
      </section>

      <div className="flex justify-center flex-col items-center p-4">
        <h1 className='text-xl text-center text-yellow-500 m-3'>Rate this Story</h1>
        <div className='py-6'>
          <Star
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

      <footer className="bg-[#18003c] text-white py-4 border-t border-yellow-500">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-xs ">Copyright © 2024 Khanify | Powered by Kahanify</p>
          </div>
          <nav className="flex justify-center">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5 items-center">
              <li>
                <NavLink
                  to="/Privacy"
                  className="hover:text-pink-600 md:text-sm lg:text-base"
                  aria-label="Privacy Policy"
                >
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Conditions"
                  className="hover:text-pink-600 md:text-sm lg:text-base"
                  aria-label="Terms and Conditions"
                >
                  Terms and Conditions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Refund"
                  className="hover:text-pink-600 md:text-sm lg:text-base"
                  aria-label="Refund Policy"
                >
                  Refund Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/FAQs"
                  className="hover:text-pink-600 md:text-sm lg:text-base"
                  aria-label="FAQ's"
                >
                  FAQ's
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  className="hover:text-pink-600 mr-3 md:text-sm lg:text-base"
                  aria-label="Contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="mt-4 md:mt-0">
            <ul className="flex justify-center space-x-2">
              <li>
                <Link to='https://www.facebook.com/KahanifyOfficial'>
                  <img src={asset24} alt="Facebook" className="h-6 w-6 hover:scale-105 mx-3 md:h-6 md:w-6" />
                </Link>
              </li>
              <li>
                <Link to='https://www.instagram.com/kahanifyofficial/'>
                  <img src={asset25} alt="Instagram" className="h-6 w-6 md:h-6 hover:scale-105 mx-3 md:w-6" />
                </Link>
              </li>
              <li>
                <img src={asset26} alt="Icon 3" className="h-6 w-6 md:h-6 hover:scale-105 mx-3 md:w-6" />
              </li>
              <li>
                <Link to='https://www.youtube.com/channel/UCnrRuc4QSzlenj_Soet80uQ'>
                  <img src={asset27} alt="YouTube" className="h-6 w-6 md:h-6 hover:scale-105 mx-3 md:w-6" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SingleKahani;
