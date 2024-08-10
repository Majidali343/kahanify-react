import React from 'react'
import Stories from './Stories'
import { Helmet } from 'react-helmet';

function Paidcontent() {
  return (
    <div>
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
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl pt-4 sm:pt-6 md:pt-6 lg:pt-6 xl:pt-6 font-bold text-[#18003c] text-center'>
    Listen Imagine Enjoy
</h1>

        <Stories />


        </div>
    </div>
  )
}

export default Paidcontent
