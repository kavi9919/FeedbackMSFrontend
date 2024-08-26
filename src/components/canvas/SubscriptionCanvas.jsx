import * as THREE from 'three';
import React, { Suspense, useRef, useState } from 'react'
import { SectionWrapper } from '../../hoc'
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { CanvasLoader } from '../loader';
import { SubscriptionOverlay } from '../overlay'
import { AccumulativeShadows, Center, Environment, Lightformer, RandomizedLight } from '@react-three/drei';
import { easing } from 'maath';



const SubscriptionCanvas = ({ position = [0, 0, 2.5], fov = 25 }) => {

  return (
    <>
        <Canvas
                shadows
                camera={{ position, fov }}
                gl={{preserveDrawingBuffer: true}} eventSource={document.getElementById('root')}
                eventPrefix="client"
                >
            {/* <Suspense fallback={<CanvasLoader />}>     
            <color attach="background" args={['#2f4547']} /> 
              <CameraRig>
                <Backdrop />
                <Center> */}
                    {/* <mesh castShadow scale={0.2} position-z={-3}>
                        <boxGeometry />
                        <meshStandardMaterial color='red' />
                    </mesh> */}
                {/* </Center>
              </CameraRig>
            </Suspense>
          <ambientLight intensity={0.5} />
          <Env /> */}
        </Canvas>
        <SubscriptionOverlay />
    </>
  )

  //This will added an invisible planer object to generate shadows
  function Backdrop() {
    const shadows = useRef()
    useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
    return (
        // This AccumulativeShadows create a hidden plane object and position it according to behind the object to generate shadows
        <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
        <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
        <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
      </AccumulativeShadows>
     
 
    )
  }

  //Control a group position with mouse interaction
  //This make a group in world 0 0 0 position and rotate it according to mouse position with some damping value
  //and pass this component childrens into that group as their childrens so all that child objects follow it's parent group translations and rotations
  function CameraRig({ children }) {
    const group = useRef()
    useFrame((state, delta) => {
      easing.damp3(state.camera.position, [ -state.viewport.width / 4, 0, 2], 0.25, delta)
      easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
    })
    return <group ref={group}>{children}</group>
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
            <Lightformer intensity={1} form="ring" color={[0.027, 0.078, 0.078]} position={[-5, 2, -1]} scale={[10, 10, 1]} />
            <Lightformer intensity={1.5} form="ring" color={[0.024, 0.063, 0.078]} position={[5, 2, -1]} scale={[10, 10, 1]} />
         </group>
      <group ref={ref}>
        <Lightformer intensity={2} form="ring" color={[0.024, 0.063, 0.078]} rotation-y={70} position={[-5, 2, -1]} scale={[10, 10, 1]} />
      </group>
    </Environment>
    )
  }

}


export default SectionWrapper(SubscriptionCanvas, "subscription", true);