import React, { useEffect, useRef, useState } from 'react'
import { mySolutionsLogo } from '../../assets'
import { styles } from '../../styles'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTER_FAILED, REGISTER_SUCCESS, sendRegisterRequest } from '../../redux/actions';
import { valtioState } from '../../redux/store/valtioStore';
import { useSnapshot } from 'valtio';

const Register = (props) => {

    const {isVisible} = props;
    const dispatch = useDispatch();
    const registerState = useSelector((state) => state.register);

    const initialRegisterValues = {userType: "", userName: "", email: "", password: ""}
    const [registerValues, setRegisterValues] = useState(initialRegisterValues);
    const [registerError, setRegisterError] = useState({});

    const resetRegisterValues = Object.keys(registerValues).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});

    const valtioSnap = useSnapshot(valtioState);

    const regFormRef = useRef();

    const userTypes = [
      { value: '1', label: 'Candidate' },
      { value: '2', label: 'Employer' }
    ];

    //reset error messages when switch between login and register
    useEffect(()=> {
      setRegisterValues({...resetRegisterValues, ["userType"]: "1"});
      resetErrors();
      const activeHashValue = valtioSnap.activeHash.substring(1);
      if(activeHashValue == "register")
         regFormRef.current.scrollTo(0, 0);
         
    }, [valtioSnap.activeHash])



    //handle auto scroll in non custom errors
    useEffect(() => {

      if(regFormRef.current && (registerError.field == undefined || registerError.field == "password"))
         regFormRef.current.scrollTop = regFormRef.current.scrollHeight;

    }, [registerError])

    //Handle Reset Errors when ui editing
    const resetErrors = (field) => {
      if(Object.keys(registerError).length == 0)
         return;
    
      if(registerError.field == undefined || field == undefined)
         setRegisterError({});
      if(registerError.field && registerError.field == field)
         setRegisterError({});
    }

    //Handle form ui field changes
    const handleRegisterChange = (e) => {
      const {name, value} = e.target;
      setRegisterValues({...registerValues, [name]: value});
      resetErrors(e.target.name);
    }

    const handleRegisterSubmit = (e) => {
      e.preventDefault();

      const values = {...registerValues};
      values.userType = registerValues.userType === "1" ? "candidate" : "employer";
      dispatch(sendRegisterRequest(values));
      
    }

    //handle response data
    useEffect(() => {
      // console.log(Object.keys(registerState?.data).length);

      // if(Object.keys(registerState?.data).length > 0)
      //   console.log(registerState?.data);

      if(registerState?.action)
      {
        
          switch(registerState.action)
          {
            case REGISTER_FAILED:
                setRegisterError(registerState.error);
              break;
            case REGISTER_SUCCESS:
              console.log("Success");
              // window.history.replaceState(null, '', window.location.pathname);
              break;
          }
      }

      
    }, [registerState]);

  //Set Initial data
  // useEffect(()=>{
  //   setRegisterValues({...registerValues, ["userType"]: "1"});
  // }, [])
  
    return (
          <form onSubmit={handleRegisterSubmit} noValidate>
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
             <div ref={regFormRef}
                  className='w-full h-[130px] scrollbar-thin scrollbar-thumb-[#3d52a0] bg-gradient-to-b from-[#3D52A0] to-[#7091E6]
                           scrollbar-track-[#7091E6] h-32 overflow-y-auto'> 
                {/* I'm */}
                <div className='flex items-center justify-evenly mt-1'>
                    <label className="cursor-pointer text-[8px] text-[#EDE8F5] text-shadow-lg">I'm</label>
                </div> 
                {/* User Type Radio Selection */}
                <div className='flex items-center justify-evenly mt-1'>
                    {userTypes.map((option) => (
                      <label key={option.value} className="group flex items-center justify-evenly cursor-pointer text-[8px]">
                        <input
                              type="radio"
                              name="userType"
                              value={option.value}
                              checked={registerValues.userType === option.value}
                              onChange={handleRegisterChange}
                              className="appearance-none bg-white border border-gray-300 border-opacity-0 
                                         rounded-full w-2 h-2 inline-block relative 
                                          after:w-[0.45rem] after:h-[0.45rem] after:bg-blue-600  after:block 
                                         after:rounded-full after:absolute after:top-1/2 after:left-1/2 after:transform 
                                         after:-translate-x-1/2 after:-translate-y-1/2 after:scale-0 checked:after:scale-75
                                         after:transition-transform after:duration-200 
                                         checked:group-hover:bg-white group-hover:bg-blueGradCol1 group-hover:bg-opacity-45
                                       checked:group-hover:after:bg-blue-500 group-hover:after:bg-blueGradCol1 
                                         checked:group-hover:after:scale-75 group-hover:after:scale-75" />
                        <span className="text-[#EDE8F5] text-shadow-lg ml-1">{option.label}</span>
                      </label>
                    ))}
                </div>
                  
                  {/* Candidate | Company name */}
                  <div className='flex items-center justify-center mt-5'>
                  <input name='userName' 
                         type='text' 
                         placeholder={`Enter your ${registerValues.userType === "2" ? 'company' : 'user'} name`} 
                         value={registerValues.userName}
                         onChange={handleRegisterChange}
                         className='w-[160px] h-[20px] text-xs p-1 bg-slate-300 text-[#252525] rounded-sm text-shadow-md' />
                  </div>
                  <div className='flex w-[160px] h-[8px] ml-4'>
                  <label className='items-start text-[6px] text-red-500'>
                    {
                      (Object.keys(registerError).length > 0 && registerError?.field === "userName") && registerError.error
                    }
                    </label>
                  </div>
                  {/* Candidate | Company email */}
                  <div className='flex items-center justify-center mt-1'>
                  <input name='email' 
                          type='email' 
                          placeholder={`Enter your ${registerValues.userType === "2" ? 'company ' : ''}email`} 
                          value={registerValues.email}
                          onChange={handleRegisterChange}
                          className='w-[160px] h-[20px] text-xs p-1 bg-slate-300 text-[#252525] rounded-sm text-shadow-md' />
                  </div>
                  <div className='flex w-[160px] h-[8px] ml-4'>
                  <label className='items-start text-[6px] text-red-500'>
                    {
                      (Object.keys(registerError).length > 0 && registerError?.field === "email") && registerError.error
                    }
                  </label>
                  </div>
                  {/* Candidate | Company password */}
                  <div className='flex items-center justify-center mt-1'>
                  <input name='password' 
                         type='password' 
                         placeholder='Enter your password' 
                         value={registerValues.password}
                         onChange={handleRegisterChange}
                         className='w-[160px] h-[20px] text-xs p-1 bg-slate-300 text-[#252525] rounded-sm text-shadow-md' />
                  </div>
                  <div className='flex w-[160px] h-[8px] ml-4 mb-1'>
                  <label className='items-start text-[6px] text-red-500'>
                    {
                      (Object.keys(registerError).length > 0 && registerError?.field === "password") && registerError.error
                    }
                  </label>
                  </div>
                  {(Object.keys(registerError).length > 0 && registerError?.field == undefined) && (
                    <div className='flex w-[160px] h-[12px] ml-4 mb-1'>
                      <label className='items-start text-[6px] overflow-hidden text-ellipsis whitespace-nowrap text-red-500'>
                        {registerError}
                      </label>
                    </div>
                  )}
                  
             </div>
  
             <div className={`w-full h-[35px] bg-[#2f438a] rounded-b-2xl`}>
                <div className='flex flex-col items-center justify-center relative inline-block'>
  
                  <button className='w-[70px] h-[20px] text-xs rounded-md mt-[2px] 
                                     bg-[#4965ca] text-white'>
                    Register
                  </button>
                  <motion.button className='absolute w-[70px] h-[20px] text-xs rounded-md mt-[2px] 
                                            bg-[#7091e6] text-[#ede8f5]'
                                 initial={{ opacity: 1 }} 
                                 whileHover={{ opacity: 0}}
                                 transition={{ duration: 0.5 }}
                                 onClick={() => handleRegisterSubmit}>
                    Register
                  </motion.button>
                </div>
                <div className='flex flex-col items-center justify-center'>
                <label className='text-[10px] text-[#EDE8F5]'>
                  I already have an account?
                </label>
                <motion.label className='absolute text-[10px] text-[#59acf0]'
                              initial={{ opacity: 0 }} 
                              whileHover={{ opacity: 1}}
                              transition={{ duration: 0.5 }}>
                  <a href={`#login`}>I already have an account?</a>
                </motion.label>
                </div>
              </div>
          </motion.div>
          </form>
  
    )
}

export default Register