import React, { useState } from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import { valtioState } from '../../redux/store/valtioStore';
import { close, tick } from '../../assets';

const SubscriptionOverlay = () => {

  const valtioSnap = useSnapshot(valtioState);
  const [activeBillingMode, setActiveBillingMode] = useState("month");

  return (
    <div className={`absolute top-1 left-0 w-full h-full flex rounded-md z-[6]
                    ${valtioSnap.activeRoute === "Subscription" ? 'canvas-overlays-visible' : 'canvas-overlays-hidden'}`}>
      <motion.div className='ml-[100%] w-[50%] h-full pt-20 pb-10 pl-10 pr-10 justify-between items-center'
                  initial={{marginLeft: '100%', opacity: 0}}
                  animate={{
                             marginLeft: valtioSnap.activeRoute == "Subscription" ? '27.5%' :  '100%',
                             opacity: valtioSnap.activeRoute == "Subscription" ? 1 :  0,
                          }}
                  transition={{ 
                                marginLeft: { 
                                  duration: 0.8, 
                                  ease:  valtioSnap.activeRoute ? "circOut" : "circIn"
                                },
                                opacity: { 
                                  duration: valtioSnap.activeRoute === "Subscription" ? 0.5 : 0.001,
                                  ease:  valtioSnap.activeRoute ? "circOut" : "circIn"
                                }
                              }}>

        <div className='bg-[#5e878f5e] w-full h-full rounded-xl flex flex-wrap  shadow-lg'>

                {/* Top Area */}
                <div className='w-full h-[10%] bg-[#97d0d82f] flex flex-wrap justify-center items-center rounded-t-md shadow-lg'>
                  <div className='w-[40%] h-[60%] bg-[#547e7ee8] rounded-md flex flex-wrap justify-start items-center shadow-md'>
 
                     
                    <div className='w-[50%] h-full flex justify-center items-center relative'>
                    <button className={`w-[93%] h-[90%] text-xs rounded-md ${activeBillingMode == "month" ? 'text-[#f8f8f8]' : 'text-[#394b4b]'} 
                                       ${activeBillingMode == "month" ? 'bg-gradient-to-r from-[#78d7e4] to-[#52c2b3]' : 'bg-gradient-to-r from-[#95b4b6] to-[#799597]'}
                                       text-sm font-medium`}>
                      Monthly Billing
                    </button>
                    <motion.button className='absolute w-[93%] h-[90%] text-xs rounded-md text-[#e9e8e8]
                                       bg-gradient-to-r from-[#8ccfd8] to-[#3c94bd] text-sm font-medium'
                                       initial={{ opacity: 0 }} 
                                       whileHover={{ opacity: 1}}
                                       transition={{ duration: 0.5 }}
                                       onClick={()=> setActiveBillingMode("month")}>
                      Monthly Billing
                    </motion.button>
                    </div>

                    <div className='w-[50%]  h-full flex justify-start items-center relative'>
                    <button className={`w-[93%] h-[90%] text-xs rounded-md ${activeBillingMode == "year" ? 'text-[#f8f8f8]' : 'text-[#394b4b]'} 
                                       ${activeBillingMode == "year" ? 'bg-gradient-to-r from-[#78d7e4] to-[#52c2b3]' : 'bg-gradient-to-r from-[#95b4b6] to-[#799597]'}
                                       text-sm font-medium`}>
                      Yearly Billing
                    </button>
                    <motion.button className='absolute w-[93%] h-[90%] text-xs rounded-md text-[#e9e8e8]
                                       bg-gradient-to-r from-[#8ccfd8] to-[#3c94bd] text-sm font-medium'
                                       initial={{ opacity: 0 }} 
                                       whileHover={{ opacity: 1}}
                                       transition={{ duration: 0.5 }}
                                       onClick={()=> setActiveBillingMode("year")}>
                      Yearly Billing
                    </motion.button>
                    </div> 
            
                  </div>  
                </div>
                {/* Middle Area */}
                <div className='w-full h-[82%] flex flex-wrap justify-center items-center overflow-y-auto'>

                    <Tilt className='h-[350px] w-[260px]  bg-blue-500 m-4 rounded-2xl flex-row items-center justify-center shadow-lg'>
                      {/* Header Section */}
                      <div className='w-full h-[23%] overflow-hidden bg-slate-600 p-1'>
                        <h3 className='text-white text-[18px] font-bold text-left'>Starter</h3>
                        <p className='text-white text-[12px] leading-none pt-1'>For new makers who want to fine tune and test an idea</p>
                      </div>
                      {/* Price Section */}
                      <div className='w-full h-[25%] bg-red-500'>
                        <h3 className='p-1'>
                          <span className="text-white text-2xl font-bold">$0</span>
                          <span className="text-gray-400 text-sm">/mo</span>
                        </h3>
                        <div className='w-full h-8 flex flex-wrap justify-center items-center'>
                          <button className='w-auto h-full bg-black pl-4 pr-4 rounded-md overflow-hidden'>Join as a Starter</button>
                        </div>
                      </div>
                      {/* Feature Section */}
                      <div className='w-full h-[52%] bg-slate-400'>

                        <div className='w-full h-[15%] flex flex-wrap justify-start items-center text-[14px] font-semibold pl-2 bg-zinc-700 overflow-hidden'>
                              <h3>WHAT'S INCLUDED</h3>
                        </div>

                          {/* Feature Body */}
                        <div className='w-full h-[85%] flex-wrap justify-start items-start p-1 overflow-y-auto bg-black'>



                            {/* Feature Item 1 */}
                            <div className='w-full h-[30px] flex flex-shrink justify-start items-center overflow-hidden bg-slate-500'>
                              <img 
                                  src={(true) ? tick : close}
                                  alt={(true) ? 'tick' : close}
                                  className='w-6 h-6 object-contain'
                                  style={{ filter: (true) ? 
                                      'invert(53%) sepia(82%) saturate(619%) hue-rotate(82deg) brightness(94%) contrast(97%)' :
                                      'invert(27%) sepia(94%) saturate(7483%) hue-rotate(340deg) brightness(103%) contrast(103%)'}}
                                    />
                              <label className='text-[14px] pl-2'>1 landing page included</label>
                            </div>

                            {/* Feature Item 2 */}
                            <div className='w-full h-[30px] flex flex-shrink justify-start items-center overflow-hidden bg-slate-500'>
                              <img 
                                  src={(true) ? tick : close}
                                  alt={(true) ? 'tick' : close}
                                  className='w-6 h-6 object-contain'
                                  style={{ filter: (true) ? 
                                      'invert(53%) sepia(82%) saturate(619%) hue-rotate(82deg) brightness(94%) contrast(97%)' :
                                      'invert(27%) sepia(94%) saturate(7483%) hue-rotate(340deg) brightness(103%) contrast(103%)'}}
                                    />
                              <label className='text-[14px] pl-2'>1 landing page included</label>
                            </div>



                        </div>
                      </div>
                    </Tilt>    

                </div>
                {/* Bottom Area */}
                <div className='w-full h-[8%]'>
                        
                </div>    

        </div>
      </motion.div>
   
    </div>
  )
}

export default SubscriptionOverlay