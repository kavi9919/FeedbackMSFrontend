import React from 'react'
import { motion } from 'framer-motion';
import { styles } from '../../styles';

const ApplicationForm = (props) => {

  const {isVisible} = props;

  return (
    <motion.div className={`w-full h-full ${styles.gradient_clay} flex items-center justify-center`}
                initial={{opacity: 0}}
                animate={{opacity: isVisible ? 1 : 0}}
                transition={{duration: 0.5, ease: isVisible ? "circOut" : "circIn"}}>
      <button className='bg-amber-500 rounded-2xl w-24'
                  onClick={() => alert('Hello World!')}>
                  Hello
      </button>
    </motion.div>
  )
}

export default ApplicationForm