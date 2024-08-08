import {React ,useEffect , useState} from 'react';
import Singleplayer from './Singleplayer'
import {  useParams } from 'react-router-dom';
import {singleStory} from '../Service/api';
import StarRating  from '../home/StarRating';
import{ Link} from "react-router-dom";
function SingleKahani() {
  const param = useParams();
  const id = param.id;
  const [data, setData] = useState(null);
const [ audio , setAudio]=useState();
const [ image , setImage]=useState();
const [ views , setViews]=useState();

  const fetchStories = async () => {
    try {
      const response = await singleStory(id);
      console.log(response.data);
      setAudio(response.data.audio);
      setImage(response.data.image);
      setViews(response.data.views)
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  useEffect(() => {
    
    fetchStories();
  }, []);

  

  return (
      <div className='bg-[#18003c]'>
     <div>
      <Singleplayer
        audioSrc={`https://kahaniapi.realtechcrm.online/storage/${audio}`}
        imageSrc={`https://kahaniapi.realtechcrm.online/storage/${image}`}
        viewCount={views}
      />
    </div>
    <div className="flex justify-center flex-col items-center p-4 ">
                <h1 className='text-xl text-center text-yellow-500 m-3'> Rate this Story</h1>
               <div>
                <StarRating />
                </div>
               <div>
                <button 
                  className=" bg-white text-[#18003c] mt-6 font-bold py-2 px-4 rounded-md hover:bg-pink-600 hover:text-white transition-colors"
                >
                  <Link to='/Paidcontent'>
                  More Stories
                  </Link>     </button>
                </div>
              </div>
    </div>
  )
}


export default SingleKahani
