import * as THREE from 'three';
import React, { Suspense, useEffect, useRef } from 'react'
import { SectionWrapper } from '../../hoc'
import { Canvas, useFrame } from '@react-three/fiber'
import { CanvasLoader } from '../loader'
import { Ground, Postbox } from '../models'
import { AccumulativeShadows, ContactShadows, Environment, Lightformer, OrbitControls, PerspectiveCamera, RandomizedLight } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import { valtioState } from '../../redux/store/valtioStore'
import { resetOribitControlsView } from '../../utils/systemUtils'
import { easing } from 'maath';



const ApplicationCanvas = () => {

  const valtioSnap = useSnapshot(valtioState);
  
  const orbitControlsRef = useRef();


  //call when canvas load success and when goto this route
  useEffect(() => {
    if(valtioSnap.activeRoute === "Application" && orbitControlsRef.current)
       resetOribitControlsView(orbitControlsRef, 0); 

  }, [valtioSnap.canvasKey !== "", valtioSnap.activeRoute])


  return (
    <>
    <Canvas
            shadows
            gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')}
            >
        <Suspense fallback={<CanvasLoader />}>
                <color attach="background" args={['#77794d']} />
                <fog attach="fog" args={['#77794d', 8, 30]} />
                <Postbox isLoaded={valtioSnap.canvasKey !== "" && true} />
                <Ground position-y={-3} 
                        materialType="edgeFade"
                        colorMap={{ url: 'assets/textures/ground_color.png', repeatX: 20, repeatY: 20 }} 
                        normalMap={{ url: 'assets/textures/ground_normal.png', repeatX: 20, repeatY: 20, normalScale: {x: 0.8, y: 0.8} }} 
                        roughnessMap={{ url: 'assets/textures/ground_roughness.png', repeatX: 20, repeatY: 20, roughness: 1 }} 
                        envMapIntensity={0.6} />
                {/* <Environment preset="city" environmentRotation={[0, 90, 0]} background blur={0.2}  /> */}
                <Env />
        </Suspense>
            <pointLight castShadow intensity={0.5}  position={[5, 5, 0]} shadow-bias={-0.0001} />
            <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
            <OrbitControls 
                        ref={orbitControlsRef}
                        enablePan={false} 
                        enableZoom={false} 
                        minPolarAngle={Math.PI / 2.2} 
                        maxPolarAngle={Math.PI / 2.2}
                        minAzimuthAngle={-Math.PI / 4}
                        maxAzimuthAngle={Math.PI / 4} />
            <PerspectiveCamera makeDefault fov={55} position={[-5, 0, -15]} />
    </Canvas>
    </>
  )
}


function Env() {

        const ref = useRef()
        const ref2 = useRef();
      useFrame((state, delta) => {
        // Animate the environment as well as the camera
            if(ref.current)
               easing.damp3(ref.current.rotation, [Math.PI / 2, 0, state.clock.elapsedTime / 5 ], 0.2, delta)
           if(ref2.current)
            ref2.current.rotation.y = THREE.MathUtils.lerp(ref2.current.rotation.y, 100, 0.1);
              
      })
    
    
        return(
          <Environment frames={1} preset="city" resolution={256} background blur={0.8}>
             <group ref={ref2}>
                <Lightformer intensity={0.5} form="ring" color={[0.859, 0.682, 0.133]} position={[2, -5, -1]} scale={[10, 10, 1]} />
                <Lightformer intensity={0.8} form="ring" color={[0.2, 0.71, 0.722]} position={[-5, 5, -1]} scale={[10, 10, 1]} />
             </group>
          <group ref={ref}>
            <Lightformer intensity={1} form="ring" color={[0.541, 0.239, 0.102]} rotation-y={70} position={[-5, 2, -1]} scale={[10, 10, 1]} />
          </group>
        </Environment>
        )
      }
    
    

export default SectionWrapper(ApplicationCanvas, "application", true)
