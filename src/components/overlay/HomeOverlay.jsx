import React from 'react'

const HomeOverlay = () => {
  return (
    <div className="absolute top-1/4 left-1/2 w-[300px] h-[80px] flex flex-col items-center justify-center bg-slate-600 rounded-md z-[6]">
      <h1 className="relative pb-[5px]">Logo</h1>
      <button className="relative w-[100px]  mb-[2px] bg-fuchsia-500 rounded-md"
              onClick={()=> alert('Hello')}>Click ME</button>
     
    </div>
  )
}

export default HomeOverlay