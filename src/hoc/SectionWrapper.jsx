import React from 'react'

const SectionWrapper = (Component, idName, isCanvas = false) => 
function HOC(){
  return(
    <>
    {isCanvas ? (
      <section className='w-full h-full' id={idName}>
      <Component />
      </section>
    ) : (
      <section
          className='m:px-16 px-6 sm:py-16 max-w-7xl mx-auto relative z-0'>
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>
        <Component />
      </section> )
    }
    
    </>
  )
}

export default SectionWrapper