import React from 'react'
import { Tilt } from 'react-tilt';

import { services } from "../constants";

import {SectionWrapper} from '../hoc'

const About = () => {
  return (
    <>
    <div>
      <p className='sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider text-[#252525] text-shadow-md'>Introduction</p>
      <h2 className='text-[#252525] font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-shadow-lg'>Overview.</h2>
    </div>
    <p className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] text-[#252525] text-shadow-md'>
      I'm a skilled software developer with experience in TypeScript and
      JavaScript, and expertise in frameworks like React, Node.js, and
      Three.js. I'm a quick learner and collaborate closely with clients to
      create efficient, scalable, and user-friendly solutions that solve
      real-world problems. Let's work together to bring your ideas to life!
    </p>
    <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
    </div>
    </>
  )
}

const ServiceCard = ({index, title, icon}) => {
  return(
    <Tilt className='sm:w-[250px] w-full rounded-[20px] shadow-xl'>
      <div className='w-full bg-gradient-to-b from-[#3D52A0] to-[#7091E6] h-64 p-[1px] rounded-[20px] shadow-card'>
        <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
            <img src={icon} alt={title} 
              className='w-16 h-16 object-contain' />
            <h3 className='text-[#EDE8F5] text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </div>
    </Tilt>
  )
}

export default SectionWrapper(About, "about");