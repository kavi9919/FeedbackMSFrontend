import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Ground, Macbook } from '../models'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import { CanvasLoader } from '../loader'
import { HomeOverlay } from '../overlay'
import { useSnapshot } from 'valtio'
import { valtioState } from '../../redux/store/valtioStore'
import { resetOribitControlsView } from '../../utils/systemUtils'
import { SectionWrapper } from '../../hoc'



const HomeCanvas = () => {
  const valtioSnap = useSnapshot(valtioState);
  const orbitControlsRef = useRef();

  const [isMobile, setIsMobile] = useState(false)


  useEffect(() => {
      const mediaQuery = window.matchMedia('(max-width: 500px)');

      setIsMobile(mediaQuery.matches);

      const handleMediaQueryChanges = (event) => {
        setIsMobile(event.matches);
      }

      mediaQuery.addEventListener('change', handleMediaQueryChanges);

      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChanges);
      }

  }, []);


  //call when canvas load success and when goto this route
  useEffect(() => {
    if(valtioSnap.activeRoute === "/" && orbitControlsRef.current)
       resetOribitControlsView(orbitControlsRef, 0); 

  }, [valtioSnap.canvasKey !== "", valtioSnap.activeRoute])


  return (
        <>
        <Canvas
              shadows 
              gl={{ preserveDrawingBuffer: true, antialias: true }} eventSource={document.getElementById('root')}
            >   
            <Suspense fallback={<CanvasLoader />}>
                {/* canvas background color */}
                <color attach="background" args={['#a4b6e9']} />
                {/* canvas depth base for starting from 0 */}
                <fog attach="fog" args={['#7091E6', 0, 30]} />
                {/* Intantiate Macbook model inside a group */}
                  <group  position={[0, -1.5, 8]} scale={isMobile ? 0.7 : 1}>
                    <Macbook scale={0} />
                  </group>
                {/* Intantiate ground plane for recieve shadows and reflections */}
                <Ground position-y={-3} 
                        mainColor={[0.239, 0.322, 0.627]}
                        materialType='edgeFade'
                        envMapIntensity={0.3} />
                {/* Add Environment cube and add city built-in preset */}
                <Environment preset="city" />
            </Suspense>
            {/* <pointLight intensity={1} /> */}
              {/* <spotLight
                  color={[1, 0.25, 0.7]}
                  intensity={1.5}
                  angle={0.6}
                  penumbra={0.5}
                  position={[5, 5, 0]}
                  castShadow
                  shadow-bias={-0.0001} />

              <spotLight
                  color={[0.14, 0.5, 1]}
                  intensity={2}
                  angle={0.6}
                  penumbra={0.5}
                  position={[-5, 5, 0]}
                  castShadow
                  shadow-bias={-0.0001} /> */}

              <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
              <OrbitControls 
                          ref={orbitControlsRef}
                          enablePan={false} 
                          enableZoom={false} 
                          minPolarAngle={Math.PI / 2.2} 
                          maxPolarAngle={Math.PI / 2.2} />
              <PerspectiveCamera makeDefault fov={55} position={[-5, 0, -15]} />
        </Canvas>
        {/* Add Overlay UI for the HomeCanvas */}
        {/* <HomeOverlay /> */}
        </>
  )
}

export default SectionWrapper(HomeCanvas, "/", true)
// export default HomeCanvas