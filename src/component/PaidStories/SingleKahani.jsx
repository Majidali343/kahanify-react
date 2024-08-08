import {React ,useEffect , useState} from 'react';
import Singleplayer from './Singleplayer'
import {  useParams } from 'react-router-dom';
import {singleStory} from '../Service/api'

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
      <div>
     <div>
      <Singleplayer
        audioSrc={`https://kahaniapi.realtechcrm.online/storage/${audio}`}
        imageSrc={`https://kahaniapi.realtechcrm.online/storage/${image}`}
        viewCount={views}
      />
    </div>

    </div>
  )
}


export default SingleKahani
