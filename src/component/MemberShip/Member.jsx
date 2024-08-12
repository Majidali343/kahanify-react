import React from 'react'

function Member() {
  return (
    <div>
      
      <div className="flex-1">
            <div>
              <h1 className='font-bold text-xl border-b-2 py-3'>
                <span className='border-b-2 border-b-blue-500 py-3'> My p</span>rofile
              </h1>
            </div>
            <div className="grid p-4 mt-6 bg-blue-100 grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder='First Name'
                  value={name}
                  readOnly
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder='Last Name'
                  value={lastName}
                  readOnly
                  onChange={(e) => setLastName(e.target.value)}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
            </div>
            </div>
          


    </div>
  )
}

export default Member
