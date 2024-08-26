import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { valtioState } from '../redux/store/valtioStore';
import { mySolutionsLogo } from '../assets'
import {navLinks} from '../constants'
import { styles } from '../styles'
import { motion } from 'framer-motion'
import { isLogging, removeLoginSession } from '../utils/apiUtils';
import { useSelector } from 'react-redux';
import { LOGIN_SUCCESS } from '../redux/actions/loginAction';
import { REGISTER_SUCCESS } from '../redux/actions';
import { getNavBarColors, initialNavBarColors } from '../utils/systemUtils';


const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const valtioSnap = useSnapshot(valtioState);
  const login = useSelector(state => state.login);
  const register = useSelector(state => state.register);

  const [navBarColors, setNavBarColors] = useState({...initialNavBarColors})


  useEffect(()=>{
    if(login.action === LOGIN_SUCCESS || register.action === REGISTER_SUCCESS)
       navigate('/');
  }, [login, register]);


  useEffect(()=>{
   valtioState.isLogged = isLogging();
   const hash = location.hash;
   valtioState.activeHash = hash;

   if(hash && (hash.substring(1) !== 'login' && hash.substring(1) !== 'register'))
   {
     const item = navLinks.find((item)=> item.id === hash.substring(1));
     valtioState.activeRoute = item ? item.title : "/";
   }
   else
   {
        valtioState.activeRoute = "/";
        window.location.hash = "/";
        if(!isLogging())
        {
          if(hash === "")
             window.location.hash = '#login';
          else
            window.location.hash = hash;
        }
        else
          window.history.replaceState(null, '', window.location.pathname);
   }
   
   setNavBarColors(getNavBarColors(valtioSnap))

  },[location]);


  useEffect(() => {
    if(valtioSnap.activeRoute)
      setNavBarColors(getNavBarColors(valtioSnap))
  }, [valtioSnap.canvasKey !== "", valtioSnap.activeRoute])

 
  return (
    <motion.nav className={`sm:px-16 px-6 w-full flex items-center py-2 fixed top-0 z-[10]`}
                initial={{background: navBarColors.background }}
                animate={{background: navBarColors.background }}
                transition={{duration: 0.5, ease: "circOut"}}>
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link 
              to={valtioSnap.activeRoute !== '/' ? '/' : location.hash}
              className='flex items-center gap-2'>
            <motion.img 
                  src={mySolutionsLogo} 
                  alt='logo' 
                  className='w-40 h-9 object-contain' 
                  style={{ filter: 'drop-shadow(2px 4px 10px rgba(0, 0, 0, 0.8))' }}
                  whileHover={{scale: 1.1}}
                  />
        </Link>
        {valtioSnap.isLogged &&
          <button onClick={()=> {
          removeLoginSession();
          valtioState.isLogged = isLogging();
          if(!isLogging())
          {
            valtioState.activeRoute = "/";
            window.location.hash = "/";
            navigate('');
          }
             
        }}>Logout</button>
        }
        
        <ul className='list-none hidden sm:flex flex-row gap-10'>
              {navLinks.map((link) => (
                <div className="relative inline-block" key={link.id}>
                <li
                    key={link.id}
                      className={`${ valtioSnap.activeRoute === link.title ? navBarColors.textSelected : navBarColors.textNormal}
                                text-[18px] font-medium cursor-pointer`}
                    onClick={() => valtioState.activeRoute = link.title}
                  >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
                <motion.li
                            className={`absolute inset-0 ${navBarColors.textHilight} text-[18px] font-medium cursor-pointer`}
                            onClick={() => valtioState.activeRoute = link.title}
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1}}
                            transition={{ duration: 0.5 }}
                            >
                            <a href={`#${link.id}`}>{link.title}</a>
                </motion.li>
                </div>
              ))}
        </ul>
      </div>
    </motion.nav>
  )
}

export default Navbar