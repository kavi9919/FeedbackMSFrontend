import React, { useEffect, useState } from 'react'
import { eyeClose, eyeOpen, mySolutionsLogo } from '../../assets'
import { styles } from '../../styles'
import { motion } from 'framer-motion';

import { LOGIN_FAILED, sendLoginRequest } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { valtioState } from '../../redux/store/valtioStore';
import { useSnapshot } from 'valtio';



const Login = (props) => {

  const {isVisible} = props;
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);

  const initialLoginValues = {email: "", password: ""}
  const [loginValues, setLoginValues] = useState(initialLoginValues);
  const [loginError, setLoginError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const resetLoginValues = Object.keys(loginValues).reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {});

  const valtioSnap = useSnapshot(valtioState);

   //reset error messages when switch between login and register
   useEffect(()=> {
    if(valtioSnap.activeHash !== "#login" && valtioSnap.activeHash !== "")
    {
      setLoginValues({...resetLoginValues});
      resetErrors();
      setShowPassword(false);
    }
    
  }, [valtioSnap.activeHash]);

  useEffect(() => {

    if(loginState?.action)
    {
      switch(loginState.action)
      {
          case LOGIN_FAILED:
            setLoginError(loginState.error);
            break;
      }
    }

  }, [loginState]) 


  //Handle Reset Errors when ui editing
  const resetErrors = (field) => {
    if(Object.keys(loginError).length == 0)
       return;
  
    if(loginError.field == undefined || field == undefined)
       setLoginError({});
    if(loginError.field && loginError.field == field)
       setLoginError({});
  }

  const handleLoginChange = (e) => {
    const {name, value} = e.target;
    setLoginValues({...loginValues, [name]: value});
    resetErrors(e.target.name);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const values = {...loginValues};
    dispatch(sendLoginRequest(values));
    
  }

  return (
      <form onSubmit={handleLoginSubmit} noValidate>
        <motion.div className={`w-[200px] h-[200px] bg-gradient-to-b from-[#3D52A0] to-[#7091E6] rounded-2xl`}
                    initial={{opacity: 0, marginRight: 500}}
                    animate={{opacity: isVisible ? 1 : 0, marginRight: isVisible ? 0 : 500}}
                    transition={{ duration: 0.5, ease: isVisible ? "circOut" : "circIn" }}>
           <div className={`w-full h-[35px] bg-[#2f438a] rounded-t-2xl`}>
            <div className='flex items-center justify-center'>
                <img
                    src={mySolutionsLogo}
                    alt='logo' 
                    className='w-[80px] h-10 fill-blue-400' 
                 />
            </div>
           </div>
           <div className='w-full h-[130px] overflow-y-auto bg-gradient-to-b from-[#3D52A0] to-[#7091E6]'> 
                <div className='flex items-center justify-center mt-7'>
                <input name='email' 
                       type='email' 
                       placeholder='Enter your email' 
                       value={loginValues.email}
                       onChange={handleLoginChange}
                       className='w-[160px] h-[20px] text-wrap text-xs p-1 bg-slate-300 text-[#252525] rounded-sm text-shadow-md' />
                </div>
                <div className='flex w-[160px] h-[8px] ml-5'>
                  <label className='items-start text-[6px] text-red-500'>
                    {
                      (Object.keys(loginError).length > 0 && loginError?.field === "email") && loginError.error
                    }
                  </label>
                  </div>
                <div className='flex items-center justify-center mt-1 ml-4'>
                <input name='password' 
                       type={showPassword ? 'text' : 'password'} 
                       placeholder='Enter your password' 
                       value={loginValues.password}
                       onChange={handleLoginChange}
                       className='w-[160px] h-[20px] text-xs p-1 bg-slate-300 text-[#252525] rounded-sm text-shadow-md' />
                    <motion.img src={showPassword ? eyeOpen : eyeClose} 
                                alt='pass-vis' 
                                className='ml-[5px] relative h-3 w-3 cursor-pointer'
                                initial={{scale: 1}}
                                whileHover={{scale: 1.1}}
                                onClick={() => setShowPassword(!showPassword)}
                                 /> 
                </div>

                <div className='flex w-[160px] h-[8px] ml-5 mb-1'>
                  <label className='items-start text-[6px] text-red-500'>
                    {
                      (Object.keys(loginError).length > 0 && loginError?.field === "password") && loginError.error
                    }
                  </label>
                  </div>
                  {(Object.keys(loginError).length > 0 && loginError?.field == undefined) && (
                    <div className='flex w-[160px] h-[12px] ml-5 mb-1'>
                      <label className='items-start text-[6px] overflow-hidden text-ellipsis whitespace-nowrap text-red-500'>
                        {loginError}
                      </label>
                    </div>
                  )}
           </div>

           <div className={`w-full h-[35px] bg-[#2f438a] rounded-b-2xl`}>
              <div className='flex flex-col items-center justify-center relative inline-block'>

                <button className='w-[70px] h-[20px] text-xs rounded-md mt-[2px] 
                                   bg-[#4965ca] text-white'>
                  Login
                </button>
                <motion.button className='absolute w-[70px] h-[20px] text-xs rounded-md mt-[2px] 
                                          bg-[#7091e6] text-[#ede8f5]'
                               initial={{ opacity: 1 }} 
                               whileHover={{ opacity: 0}}
                               transition={{ duration: 0.5 }}
                               onClick={() => handleLoginSubmit}>
                  Login
                </motion.button>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <label className='text-[10px] text-[#EDE8F5]'>
                    Don't have an account?
                </label>
                <motion.label className='absolute text-[10px] text-[#59acf0]'
                              initial={{ opacity: 0 }} 
                              whileHover={{ opacity: 1}}
                              transition={{ duration: 0.5 }}>
                  <a href={`#register`}>Don't have an account?</a>
                </motion.label>
              </div>
            </div>
        </motion.div>
      </form>
  )
}

export default Login;