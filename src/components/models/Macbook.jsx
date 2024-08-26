import * as THREE from 'three';
import { Html, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import {Login, Register} from '../wrappers';
import { styles } from '../../styles';
import { clamp } from 'three/src/math/MathUtils.js';
import { Provider } from 'react-redux';
import store from '../../redux/store/configureStore';
import { useSnapshot } from 'valtio';
import { valtioState } from '../../redux/store/valtioStore';
import { easing } from 'maath';

const Macbook = (props) => {

  const parentGrpRef = useRef()
  const ipadGrpRef = useRef()
  const {nodes, materials} = useGLTF('/assets/models/mac-draco.glb')

  const [shakeDuration, setShakeDuration] = useState(0);

  const [isLoginVisible, setisLoginVisible] = useState(true)
  const [isCanvasHovered, setIsCanvasHovered] = useState(false);

  const initialScreens = {loginScreen: true, registerScreen: false}
  const [activeScreen, setActiveScreen] = useState(initialScreens);
  const resetScreens = Object.keys(activeScreen).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {});

  const valtioSnap = useSnapshot(valtioState);

  useEffect(() => {
    if(valtioSnap.activeRoute == "/")
    {
      const activeHashValue = valtioSnap.activeHash.substring(1);
      switch(activeHashValue)
      {
          case "register":
            setActiveScreen({...resetScreens, registerScreen: true})
            break;
          case "login":
            setActiveScreen({...resetScreens, loginScreen: true})
            break;
          default:
            setActiveScreen({...resetScreens});
            break;
      }
    }

  }, [valtioSnap.activeHash])


  useFrame((state, delta ) => {
    
    //Add floating effect to the ipad
    const t = state.clock.getElapsedTime()
    parentGrpRef.current.rotation.x = THREE.MathUtils.lerp(parentGrpRef.current.rotation.x, Math.cos(t / 2) / 20 + 0.25, 0.1)
    parentGrpRef.current.rotation.y = THREE.MathUtils.lerp(parentGrpRef.current.rotation.y, Math.sin(t / 4) / 20, 0.1)
    parentGrpRef.current.rotation.z = THREE.MathUtils.lerp(parentGrpRef.current.rotation.z, Math.sin(t / 8) / 20, 0.1)
    parentGrpRef.current.position.y = THREE.MathUtils.lerp(parentGrpRef.current.position.y, (-1 + Math.sin(t / 2)) / 2, 0.1)

    //Handle error shake
    setShakeDuration(clamp(shakeDuration - delta, 0, 2));
    if(shakeDuration > 0)
    {
      const randomNumber = (Math.random() * 2) - 1;
      ipadGrpRef.current.rotation.y = THREE.MathUtils.lerp(ipadGrpRef.current.rotation.y, 0 + randomNumber * 0.5, 0.1);
    }
    else
       ipadGrpRef.current.rotation.y = THREE.MathUtils.lerp(ipadGrpRef.current.rotation.y, 0, 0.1);

    
        //controll macbook appear
        easing.damp3(parentGrpRef.current.scale, valtioSnap.isLogged ? 0 : 1, 0.25, delta);

        //focus ipad when mouse hovered base on mouse position

        if(isCanvasHovered)
           easing.dampE(parentGrpRef.current.rotation, [parentGrpRef.current.rotation.x + (state.pointer.y / 5), parentGrpRef.current.rotation.y + (state.pointer.x / 5), 0], 0.25, delta)

  });


  return (
    
    <group ref={parentGrpRef} {...props} dispose={null} >
        <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
            <group ref={ipadGrpRef} position={[0, 2.96, -0,13]} rotation={[Math.PI / 2, 0, 0]}>
                <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
                <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry}  material-color={[0.145, 0.145, 0.145]} />
                <mesh geometry={nodes['Cube008_2'].geometry} >
                  <Html className={`${styles.ipadContent} bg-custom-radial-b scale-[2.5] ${valtioSnap.activeRoute === "/" ? 'canvas-overlays-visible' : 'canvas-overlays-hidden'}`} rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude zIndexRange={[0, 5]} distanceFactor={4} >
                    <div className={`w-full h-full text-[#252525] flex items-center justify-center absolute`} onPointerDown={(e) => e.stopPropagation()} onPointerOver={() => setIsCanvasHovered(true)} onPointerOut={() => setIsCanvasHovered(false)}>
                      {/* store context cannot pass through Html component so we need to re bind store in here to pass it Login component */}
                        <Provider  store={store}>
                        <div className={`absolute w-full h-full flex items-center justify-center overflow-hidden ${activeScreen.loginScreen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                          <Login isVisible={activeScreen.loginScreen} />
                        </div>
                        <div className={`absolute w-full h-full flex items-center justify-center overflow-hidden ${activeScreen.registerScreen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                         <Register isVisible={activeScreen.registerScreen} />
                        </div>
                        </Provider>
                    </div>
                  </Html>
                </mesh>
            </group>
        </group>
        {/* <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} /> */}
        {/* <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
        <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
      </group> */}
      {/* <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} /> */}
    </group >
   
  )
}

export default Macbook