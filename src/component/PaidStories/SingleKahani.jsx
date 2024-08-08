import {React ,useEffect , useState} from 'react';
import Singleplayer from './Singleplayer'
import {  useParams } from 'react-router-dom';
import {singleStory} from '../Service/api'

function SingleKahani() {
  const param = useParams();
  const id = param.id;
  const [data, setData] = useState(null);

  const fetchStories = async () => {
    try {
      const response = await singleStory(id);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  useEffect(() => {
    
    fetchStories();
  }, []);

  if (!data) {
    return <div>Loading...</div>; 
  }

  return (
      <div>
     <div>
      <Singleplayer
        audioSrc={data.audio}
        imageSrc={`https://kahaniapi.realtechcrm.online/storage/${data.image}`}
        viewCount={data.views}
      />
    </div>

    </div>
  )
}


export default SingleKahani
