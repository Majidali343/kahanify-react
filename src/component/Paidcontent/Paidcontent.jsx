import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Slider from '../home/Card'
function Paidcontent() {
  return (
    <div>
        <div>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20 font-bold text-[#18003c] text-center'>
    Listen Imagine Enjoy
</h1>

        <SearchBar/>

        <Slider />


        </div>
    </div>
  )
}

export default Paidcontent
// first filter and secound conect with adio player