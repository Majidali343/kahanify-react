import React from 'react';
import { asset14, asset1, asset23, asset9, asset10 } from '../imageLoader';
import Slider from './Card';
import { Link } from 'react-router-dom';
 import "../Css/home.css"
 import { Helmet } from 'react-helmet';
import Testimonial from '../Testimonial/Testimonial';
import Pic from '../../assets/Mom.png';
import { MdNavigateNext } from "react-icons/md";
function Home() {
  return (
    <>

<Helmet>
        <title>Kids Audio Stories | Kahanify</title>
        <meta name="description" content="Kahanify offers captivating audio stories for kids, fostering imagination and language development through enchanting narratives." />
        <meta name="keywords" content="kids audio stories, children's stories, Urdu stories, educational audio, storytelling" />
        <meta property="og:title" content="Kids Audio Stories | Kahanify" />
        <meta property="og:description" content="Kahanify offers captivating audio stories for kids, fostering imagination and language development through enchanting narratives." />
        <meta property="og:image" content={asset14} />
        <meta property="og:url" content="http://Kahanify.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>


    <div
      className="h-screen bg-cover   responsive-background"
    >   
      <div className="flex main   ">
        <div 
          className="text-white text-center rest  "
          style={{ margin: '14% 20% 8% 5%' }}
        >
          <h1
  style={{
    textShadow: '1px 1px 2px rgba(0, 0, 0, 1.6)',
    WebkitTextStroke: '1px rgba(0, 0, 0, 1.8)', 
    textShadow: '1px 1px 2px rgba(0, 0, 0, 1.6)' 
  }}

          className="text-3xl sm:text-4xl  md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-6xl  heading text-pretty  mb-2">Unlimited  Audio  Stories</h1>
          <h2
          
  style={{
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    WebkitTextStroke: '1px rgba(0, 0, 0, 0.4)', 
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' 
  }}
          className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl text-bold 2xl:text-3xl mb-4">Listen  Imagine  Enjoy</h2>
          <button
            className="bg-blue-600 text-base sm:text-lg btn md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl   text-white py-2 px-4 rounded-[6px] text-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-pink-600 hover:border-light-blue-300 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50"
          >
            <Link to='/signup' className='flex' > Get Started  <span className='text-white self-center '>
              <MdNavigateNext  />
              {/* &gt; */}
              </span> </Link>
            
          </button>
        </div>
      </div>
    </div>
    
    <div className="flex justify-center items-center flex-col  sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-8">
    <div className=" p-4 sm:p-6 md:p-8 md:mx-5 lg:p-10 xl:p-4">
      <div className="text-center mx-2 w-auto sm:mx-4 md:mx-6 lg:mx-8 xl:mx-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-sans lg:text-3xl xl:text-3xl 2xl:text-3xl main mx-20 font-bold text-[#200899] border-b border-[#200899]  mb-4 pb-2">
          Audio Tales: Where Imagination Meets the Power of Sound.
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center font-sans text-center text-[#200899] mx-2 sm:mx-4 md:mx-6 lg:mx-12 xl:mx-12">
        <p className="text-[0.95rem] pt-2 mb-4 sm:mb-6 md:mb-6 lg:mb-6 leading-relaxed xl:mb-8">
          Kahanify brings the charm of storytelling to young minds. Embark on a captivating audio journey. Immerse in a world where stories come to life through the magic of sound. Our curated collection of audio stories is tailored for children, fostering imagination, language development, and a love for storytelling. Dive into a world of fanciful narratives, charming characters, and moralistic adventures, designed to spark interest and ignite the joy of listening in the hearts of the little ones. With Kahanify, every moment becomes an opportunity for young minds to explore, learn, and be delighted.
        </p>
        <button className="bg-blue-700 rounded font-bold flex justify-center self-center text-white  px-6 py-3 text-sm   transition-transform duration-300 ease-in-out  transform hover:scale-105 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50">
          <Link to='/signup'>Register Now </Link>
        </button>
      </div>
    </div>
  </div>
  <div class="bg-[#18003c] lg:h-[110vh] md:h-auto m-0 p-0 flex flex-col lg:flex-row">
  <div class="w-full lg:w-1/2 flex-shrink-0">
    <img src={asset1} alt="story" class=" object-fill h-[50vh] md:h-full w-full" />
  </div>
{/* <div className='w-full lg:w-1/2 h-full'>
  <div class=" bg-cover bg-center flex flex-col items-center justify-between  sm:p-16 lg:p-7 pt-[30px] sm:pt-[80px]"
        style={{ 
         backgroundImage: `url(${asset23})`,
         backgroundSize: '85%',
         backgroundRepeat: 'no-repeat',

  filter: brightness(0) invert(1);

       }}
  >
    <h1 class="text-white font-bold text-4xl md:text-5xl  sm:px-0 sm:m-o sm:text-xl mt-10 mb-16  lg:mb-0 px-8   text-center">
      <a  class="hover:underline">FREE STORY</a>
    </h1>
  
    <div class="flex flex-col items-center  mt-16 sm:mt-16 md:mt-24 lg:mt-0 xl:mt-30 2xl:mt-60 ">
      <p class="text-white font-bold text-lg mt-16 lg:mt-72 pt-8 lg:pt-24  md:text-xl mb-4 text-center hover:underline">Discover the magic of storytelling with Kahanify</p>
      <button class="bg-white text-[#18003c] py-2  my-4 lg:my-10 lg:mt-16 px-5 font-bold  hover:bg-pink-600 hover:text-white">
        <Link to='/FreeStory'>Try For Free</Link>
      </button>
      </div>
    </div> */}
  {/* </div> */}

  <div className='w-full lg:w-1/2 h-full flex items-center justify-center flex-col'>
  
  <div> 
    <h1 class="text-white font-bold text-4xl md:text-5xl  sm:px-0 sm:m-o sm:text-xl mt-10 mb-10 md:mb-10 lg:mb-10   px-8   text-center">
      <a  class="hover:underline">FREE STORY</a>
    </h1>
    </div>
  <div className='mt-6 sm:mt-6 md:mt-0 lg:mt-8 xl:mt-8 2xl:mt-10'>
    <img src={asset23} alt="Kahani"    style={{ 
         filter: 'brightness(1) invert(0)',
  

       }}/>
  </div>
  <div class="flex flex-col items-center  mt-8 sm:mt-8 md:mt-10 lg:mt-8 xl:mt-8 2xl:mt-16">
      <p class="text-white font-bold text-lg   md:text-xl mb-4 text-center hover:underline">Discover the magic of storytelling with Kahanify</p>
      <button class="bg-white text-[#18003c] py-2 text-lg my-4 lg:my-10 lg:mt-10 px-7 font-bold  hover:bg-pink-600 hover:text-white">
        <Link to='/FreeStory'>Try For Free</Link>
      </button>
      </div>
   
  
  </div>



</div>



<div>
<div>
  <h1 className='text-center  text-4xl lg:text-6xl text-[#18003c] py-4 mt-4 font-bold '>
  POPULAR STORIES
  </h1>
</div>

<div class="px-4">
</div>
<Slider />
  </div>

<div className="px-0 sm:px-8 mx-0 sm:mx-8">
<div className='urdu leading-loose'>
<h1 className='text-[#ff912c] text-center font-bold  text-2xl sm:text-4xl'>محترم والدین</h1>
<p className='text-right  text-gray-500 leading-loose text-xl m-4 sm:m-8 '>

چھوٹے بچے خود تو کہانیاں نہیں پڑھ سکتے، لیکن اگر ان کو کہانی سنائی جائے تو بہت شوق سے سنتے ہیں، اور باربار سنانے کی فرمائش کرتے ہیں۔ اگر ان کہانیوں میں کوئی مثبت پیغام ہو تو بارہا سننے کی وجہ سے وہ انہیں ہمیشہ یاد رہتا ہے اور بچوں کی شخصیت سازی میں بہترین کردار ادا کرتا ہے۔ لیکن آج کے اس مصروف دور میں اکثر والدین کو یہ فرصت میسر نہیں ہوتی کہ وہ بچوں کو باقاعدگی سے کہانیاں سنا سکیں۔
</p>

<p className='text-right text-gray-500 leading-loose text-xl  m-4 sm:m-8'>
اسی لئے والدین کی سہولت کے پیش نظر  
<span className='font-bold '>کہانیفائے  </span>

دے رہا ہے 3سال سے 10 سال تک کی عمر کے بچوں کے لئے دلچسپ اور سبق آموز آڈیو کہانیوں کا آن لائن ایکسس۔ رات کو سونے سے پہلے، دن میں آرام کے وقت یا پھرجب بھی جہاں بھی، بچے کہانی سننا چاہیں، آپ  
<span className='font-bold'> کہانیفائے </span>

کی ممبرشپ حاصل کرکے تمام آڈیو کہانیوں تک رسائی حاصل کر سکتے ہیں۔ اور بچوں کی من چاہی کہانیاں انہیں موبائل پر سنوا سکتے ہیں۔ اگر خود سے پڑھ کر سنانا چاہیں تو 
<span className='font-bold '>کہانیفائے  </span>

پر تمام کہانیاں تحریری شکل میں موجود ہیں۔ ہماری ایک تحقیق کے نتیجے میں 2 سال سے 13 سال تک کے اکثر بچوں کو 
<span className='font-bold'>کہانیفائے  </span>
کی آڈیو کہانیاں سننا پسند ہے۔


</p>
<h3 className= "text-right text-blue-700 font-sans leading-loose text-xl hover:underline font-bold m-4 sm:m-8"><Link to='/signup' > Register Now</Link></h3>


<p className='text-right text-gray-500 leading-loose text-xl  m-4 sm:m-8 '>
وہ والدین جو بچوں کو موبائل کا ایکسس نہیں دینا چاہتے وہ با آسانی آڈیو کہانی پلے کرکے موبائل سکرین لاک کر سکتے ہیں۔ بیک گراؤنڈ میں کہانی چلتی رہے گی اور بچے بھی موبائل ایکسس کے بغیر معیاری کونٹینٹ سے لطف اٹھاتے رہیں گے۔
</p>

<p className='text-right text-gray-500 leading-loose text-xl  m-4 sm:m-8'>
معیاری اور بامقصد کونٹینٹ کی فراہمی کے لئے کہانیفائے  کی ماہانہ اور سالانہ ممبرشپ کے تحت معمولی فیس رکھی گئی ہے۔ جس کے فائدے بیشمار ہونگے اور تفریح ہی تفریح میں بچے بہت سی اچھی باتیں سیکھیں گے۔
</p>

<h3 className= "text-right text-blue-700 font-sans sm:text-xl hover:underline font-bold m-4 sm:m-8"><Link to='/signup' > Register Now</Link></h3>
<div className='text-right text-gray-500 leading-loose text-xl   m-4 sm:m-8'>
  <ol  className=' list-right list-inside space-y-2'>
    <li> آڈیو کہانیاں سننے سے بچوں کا حافظہ بہتر ہوگا۔ </li>
    <li>بچوں کے اٹینشن سپین ( توجہ کا دورانیہ) میں اضافہ ہوگا۔</li>
    <li>بچوں کی تخلیقی صلاحیتیں اجاگر ہوں گی۔</li>
    <li>نئی چیزیں سیکھنے اور سمجھنے کی صلاحیت بڑھے گی۔</li>
    <li> غیرمعیاری کونٹینٹ اور اشتہارات سے پاک محفوظ تفریح ملے گی۔</li>
    <li>ذخیرہ الفاظ اور اردو زبان کا صحیح تلفظ سیکھنے میں مدد ملے گی۔</li>
    <li>بچوں میں کتاب دوستی اور پڑھنے کا شوق پیدا ہو گا۔</li>
    <li>سوشل میڈیا کے برے اثرات سے بچنے میں مدد ملے گی۔</li>
    <li>شجاعت، سخاوت، دیانت اور دانشمندی جیسی بہت سی مثبت صفات کی جانب رجحان بڑھے گا۔</li>
  <p> بچوں کو محفوظ اور بامقصد تفریح پہنچانے میں آپ کا معاون</p>
  <p>Kahanify</p>
  </ol>  
</div>
</div>
<div className='flex justify-center'>
<button className="bg-blue-700 urdu  text-white py-2 px-4 rounded  transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-pink-600 hover:border-light-blue-300 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50">
  <Link to='/signup' > رجسٹر کریں</Link></button>
  
</div>

<div className='px-4 sm:px-8 sm:mx-8'>
<h1 className='text-[#ff912c] font-bold mt-8 text-xl sm:text-2xl'>Welcome to Kahanify – Your Destination for Immersive Urdu Audio Stories!</h1>
<p className='text-gray-500 text-sm font-bold  my-4 '>Looking for the best Urdu kahaniyan for kids? Look no further! Our curated collection of stories in Urdu will captivate young minds and instill important life lessons through moral stories.
</p>
<p className='text-gray-500 text-sm font-bold  my-4 '>Explore our wide range of bedtime stories in Urdu, perfect for story time with your little ones. From adventurous tales to heartwarming narratives, our selection of audio stories for kids will bring joy and knowledge to your children.
</p>
<p className='text-gray-500 text-sm font-bold  my-4 '>Don’t just read, listen to the best audio stories in Urdu with our interactive platform. Engage with the stories in a whole new way and let your imagination soar.
</p>
<p className='text-gray-500 text-sm font-bold  my-4 '>Discover the magic of Urdu stories today and let the journey begin!
</p>

<p className='text-gray-500 text-sm font-bold  my-4 '>Immerse yourself in the rich tradition of Urdu storytelling with Kahanify. Whether you’re seeking timeless classics or contemporary narratives, our curated collection promises to ignite your imagination and touch your heart.
</p>
<h1 className='text-[#ff912c] font-bold mt-8 '>Why Choose Kahanify?</h1>

<p className='text-gray-500 text-sm font-bold  my-4 '><span className='text-black'> Vast Collection: </span>  Explore a diverse range of Urdu kahaniyan for kids.
</p>
<p className='text-gray-500 text-sm font-bold  my-4 '><span className='text-black'>Audio Experience:</span>Listen to stories brought to life by talented narrators, making every tale engaging and memorable.
</p>
<p className='text-gray-500 text-sm font-bold  my-4 '><span className='text-black'>Convenience:</span> Access stories anytime, anywhere – perfect for on-the-go listening or winding down at home.
</p>
<p className='text-gray-500 text-sm font-bold  my-4 '><span className='text-black'>Family-Friendly:</span>Kids’ bedtime stories to thought-provoking moral tales.
</p>

<h3 className= "text-blue-700   hover:underline font-bold my-4"><Link to='/signup' > Register Now</Link></h3>

<h1 className='text-[#ff912c] font-bold mt-8 '>Membership Benefits</h1>
<p className='text-black-500 text-sm font-bold  my-4 '>Unlock a world of Urdu storytelling with a Kahanify membership:</p>
<p className='text-gray-500 text-sm font-bold  my-4 '><span className='text-black'> Unlimited Access: </span>  Enjoy unrestricted access to our entire library of audio stories.
</p>
<p className='text-gray-500 text-sm font-bold  my-4 '><span className='text-black'>Exclusive Content:</span>Discover member-only stories and updates.
</p>
<p className='text-gray-500 text-sm font-bold  my-4 '><span className='text-black'>Ad-Free Listening:</span> Immerse yourself in uninterrupted storytelling.
</p>

<p className='text-black-500 text-sm font-bold  my-4 '>Browse Our Categories</p>
<p className='text-gray-500 text-sm font-bold  my-4 '><span className='text-black'> Kids’ Stories: </span>  Delightful and educational stories for young listeners.
</p>
<p className='text-gray-500 text-sm font-bold  my-4 '><span className='text-black'>Classic Tales: </span> Timeless masterpieces that continue to inspire.
</p>
<p className='text-gray-500 text-sm font-bold  my-4 '><span className='text-black'>Moral Stories:</span> Engaging narratives with valuable life lessons.
</p>
<p className='text-gray-500 text-sm font-bold  my-4 '><span className='text-black'> Contemporary Gems:</span>  Modern stories reflecting diverse themes and perspectives.
</p>

<h1 className='text-[#ff912c] font-bold mt-8 '>How to Get Started?</h1>
<p className='text-gray-500 text-sm font-bold  my-4 '><span className='text-black'> Register:  </span> Sign up for a free account on Kahanify.com.
</p>
<p className='text-gray-500 text-sm font-bold  my-4 '><span className='text-black'>Browse:</span> Explore our collection and discover your favorite stories.
</p>
<p className='text-gray-500 text-sm font-bold  my-4 '><span className='text-black'>Subscribe:</span>Choose a membership plan for unlimited listening.
</p>

<p className='text-gray-500 text-sm font-bold  my-4 '>Join the Kahanify Community
</p>


<p className='text-gray-500 text-sm font-bold  my-4 '>Start Your Journey Today
</p>

<p className='text-gray-500 text-sm font-bold  my-4 '>Embark on a storytelling adventure with Kahanify. Whether you’re rediscovering childhood favorites or exploring new narratives, our platform promises an immersive and rewarding experience.
</p>

<h3 className= "text-blue-700  hover:underline font-bold my-4"><Link to='/signup' > Register Now</Link></h3>


<h1 className='text-[#ff912c] text-xl sm:text-3xl font-bold mt-8 '>Urdu Stories: Nurturing Imagination and Values in Children</h1>
<h1 className='text-[#ff912c] font-bold mt-6 '>Introduction to Urdu Stories</h1>

<p className='text-gray-500 text-sm font-bold  my-3 '>Urdu stories encompass a wide range of tales told in the Urdu language, known for its poetic and melodious expressions. These stories cover diverse themes, including moral lessons, adventures, and folklore, catering to readers of all ages.
</p>

<h1 className='text-[#ff912c] font-bold mt-6 '>Importance of Urdu Stories for Kids</h1>

<p className='text-gray-500 text-sm font-bold  my-3 '>For children, Urdu stories serve as a gateway to language proficiency, moral development, and creative thinking. They offer a blend of entertainment and education, making learning enjoyable and meaningful.
</p>
<h1 className='text-[#ff912c] font-bold mt-6 '>Variety of Urdu Stories Available</h1>

<p className='text-gray-500 text-sm font-bold  my-3 '>Urdu stories come in various forms, from traditional written narratives to modern audio adaptations. They include moral stories, adventure tales, and bedtime fables, each designed to impart important life lessons.
</p>

<h3 className= "text-blue-700  hover:underline font-bold my-4"><Link to='/signup' > Register Now</Link></h3>
<h1 className='text-[#ff912c] font-bold mt-6 '>Benefits of Reading Urdu Stories</h1>
<p className='text-gray-500 text-sm font-bold  my-3 '>Reading Urdu stories benefits children in multiple ways. It enhances language skills, promotes empathy, and stimulates imagination. Moreover, these stories often convey valuable moral teachings in a subtle and engaging manner.
</p>

<h1 className='text-[#ff912c] font-bold mt-6 '>Best Urdu Stories for Children</h1>
<p className='text-gray-500 text-sm font-bold  my-3 '>Certain Urdu stories have become timeless classics, cherished by generations. Blending tradition with modern storytelling techniques.</p>

<h1 className='text-[#ff912c] font-bold mt-6 '>Popular Platforms for Accessing Urdu Stories</h1>
<p className='text-gray-500 text-sm font-bold  my-3 '> With the advent of digital media, accessing Urdu stories has never been easier. Numerous websites and mobile apps offer a vast collection of Urdu literature, making it accessible to a global audience.
</p>

<h1 className='text-[#ff912c] font-bold mt-6 '>How to Choose the Right Urdu Story for Kids?</h1>
<p className='text-gray-500 text-sm font-bold  my-3 '> Parents and educators should consider the age appropriateness and content of Urdu stories when selecting them for children. Tailoring the selection to a child’s interests and developmental stage ensures an enriching experience.</p>


<h1 className='text-[#ff912c] font-bold mt-6 '>Tips for Making Story Time Engaging</h1>
<p className='text-gray-500 text-sm font-bold  my-3 '> To maximize the benefits of Urdu stories, incorporate interactive elements and use engaging reading techniques. This not only captures children’s attention but also fosters a love for storytelling.</p>
<h3 className= "text-blue-700  hover:underline font-bold my-4"><Link to='/signup' > Register Now</Link></h3>


<h1 className='text-[#ff912c] font-bold mt-6 '>Incorporating Moral Lessons in Urdu Stories</h1>
<p className='text-gray-500 text-sm font-bold  my-3 '> Many Urdu stories are designed explicitly to convey moral values. By exposing children to these narratives, parents and educators can instill positive values and ethical principles from an early age.</p>


<h1 className='text-[#ff912c] font-bold mt-6 '>Audio Stories: A Modern Approach</h1>
<p className='text-gray-500 text-sm font-bold  my-3 '> Audio stories provide a dynamic way to experience Urdu narratives. They offer convenience and accessibility, allowing children to enjoy stories anytime, anywhere.</p>
<h3 className= "text-blue-700  hover:underline font-bold my-4"><Link to='/signup' > Register Now</Link></h3>

<h1 className='text-[#ff912c] font-bold mt-6 '>Encouraging Children to Create Their Own Urdu Stories</h1>
<p className='text-gray-500 text-sm font-bold  my-3 '> Encouraging children to write or narrate their own Urdu stories promotes creativity and self-expression. This process enhances language skills and boosts confidence in young storytellers.</p>

<h1 className='text-[#ff912c] font-bold mt-6 '>Tips for Parents and Educators</h1>
<p className='text-gray-500 text-sm font-bold  my-3 '>Introducing Urdu stories to children requires thoughtful consideration. By actively engaging in storytelling sessions and discussing story themes, parents and educators can enrich a child’s learning experience.</p>

<h1 className='text-[#ff912c] font-bold mt-6 '>Conclusion</h1>
<p className='text-gray-500 text-sm font-bold  my-3 '> Urdu stories play a pivotal role in educating and entertaining children. They foster language development, nurture creativity, and impart important life lessons. By incorporating these stories into a child’s routine, parents and educators can contribute significantly to their holistic growth.</p>
<h3 className= "text-blue-700  hover:underline font-bold my-4"><Link to='/signup' > Register Now</Link></h3>

<h1 className='text-[#ff912c] font-bold mt-6  '>FAQs About Urdu Stories</h1>

<ol className='list-decimal  mx-3'>
  <li className='text-black-500 text-sm font-bold  my-3'>Are Urdu stories suitable for non-Urdu speakers?</li>
<p className='text-gray-500 text-sm font-bold  my-3 '> Urdu stories can be enjoyed by anyone, regardless of language background. English translations or bilingual versions are often available.</p>
  
<li className='text-black-500 text-sm font-bold  my-3'> How can I find audio Urdu stories for my child?</li>
<p className='text-gray-500 text-sm font-bold  my-3 '>Several online platforms and apps specialize in audio Urdu stories for children. Look for reputable sources with quality content. </p>
  
<li className='text-black-500 text-sm font-bold  my-3'>What age group are Urdu stories suitable for?</li>
<p className='text-gray-500 text-sm font-bold  my-3 '>Urdu stories cater to various age groups, from toddlers to young adults. Choose stories based on themes and complexity appropriate for your child’s age. </p>
  
<li className='text-black-500 text-sm font-bold  my-3'>Can Urdu stories help improve language skills?</li>
<p className='text-gray-500 text-sm font-bold  my-3 '>Yes, reading and listening to Urdu stories can enhance vocabulary, comprehension, and pronunciation skills. </p>
  
<li className='text-black-500 text-sm font-bold  my-3'>Are there Urdu stories with diverse cultural themes?</li>
<p className='text-gray-500 text-sm font-bold  my-3 '>Absolutely! Urdu stories often reflect diverse cultures and traditions, offering valuable insights into different lifestyles and beliefs. </p>

  </ol>
  <h1 className='text-[#ff912c] font-bold mt-8 text-xl sm:text-2xl'>  Unleash the magic of Urdu storytelling – Join Kahanify today!
  </h1>
  <div className='flex justify-center m-4 sm:m-8'>
  <button className="bg-blue-700 text-white py-2 px-4 rounded  transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-pink-600 hover:border-light-blue-300 focus:outline-none focus:ring-2 focus:ring-light-blue-500 focus:ring-opacity-50">
  <Link to='/signup' > Register Now</Link></button>  
      </div>
</div>
</div>


<div class="bg-[#18003c]  h-auto m-0 p-0">
  <div class="flex flex-col md:flex-row h-full w-full">
    <div class="w-full md:w-1/2 sm:h-1/2 md:h-full bg-cover bg-center">
      <img src={Pic} alt="story" class="w-full sm:h-[100vh] h-auto lg:min-h-svh  object-cover" />
    </div>
    
    <div class="w-full md:w-1/2 sm:h-1/2 md:h-full bg-cover bg-center text-right ">
    <div className='sm:flex   sm:flex-col sm:text-xl'>
      <div className='urdu flex flex-col items-center h-[100vh] md:h-auto  justify-center'>
  <h1 className='gradient-text  font-bold py-8 text-xl md:text-3xl ' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    بچوں کے لیےنت نئی پر لطف کہانیاں
  </h1>
<div className='flex flex-col justify-start'>  
  <p className='text-white my-2  ' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    <span className='inline-block'>اشتہارات سے پاک محفوظ تفریح</span>
    <img className='inline-block w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-10 ml-2' src={asset10} alt="logo" />
  </p>
  
  <p className='text-white my-2 ' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    <span className='inline-block'>چاہے آڈیو فائل پلے کریں یا خود سنائیں</span>
    <img className='inline-block w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-10 ml-2' src={asset10} alt="logo" />

  </p>
  
  <p className='text-white my-2' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    <span className='inline-block'>بچوں کی بہترین تربیت میں مدد گار</span>
    <img className='inline-block w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-10 ml-2' src={asset10} alt="logo" />

  </p>
  
  <p className='text-white my-2 ' style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
    <span className='inline-block'>کرے اجاگر بچوں کی تخلیقی صلاحیتیں</span>
    <img className='inline-block w-6 h-6 sm:w-4 sm:h-4 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-10 xl:h-10 ml-2' src={asset10} alt="logo" />
  </p>
</div>
<button class="bg-white text-[#18003c] text-center urdu px-8 py-3 my-8  md:my-10 lg:my-8 xl:my-10 text-sm font-bold rounded hover:bg-pink-600 hover:text-white">
        <Link to='/signup'> رجسٹر کریں</Link>
      </button>
     
</div>
    </div>
    </div>
  </div>
  

</div>
<div className=' flex flex-col justify-center items-center bg-white'>

<div className='w-[90vw]'>
<Testimonial/>
  </div>

</div>
   </>
  );
}

export default Home;
