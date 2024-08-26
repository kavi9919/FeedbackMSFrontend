import * as THREE from 'three';
import { Html, useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from '../../styles'
import { valtioState } from '../../redux/store/valtioStore';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Provider } from 'react-redux';
import store from '../../redux/store/configureStore';
import { ApplicationForm } from '../wrappers';


const Postbox = (props) => {

  const valtioSnap = useSnapshot(valtioState);

  const [isAppFormVisible, setIsAppFormVisible] = useState(false)

  //skinned mesh refs
  const postBoxRef = useRef();
  const letterJtRef = useRef();
  const coverRef = useRef();

  //custom object ref for letter
  const cusObjectRef = useRef();
  
    const {nodes, materials, animations} = useGLTF('/assets/models/postbox_anim_ver_b3.glb')
    const { ref, actions, mixer } = useAnimations(animations)
    const [curAnim, setCurAnim] = useState("");
    const {isLoaded} = props;

    //Custom Ref for get the 3d letter object position to follow a new object  
    //and make Html UI child of that new object
    const letterTransformRef = useRef({
      position: new THREE.Vector3(),
      rotation: new THREE.Euler(),
      scale: new THREE.Vector3(),
    });

    //Custom Ref for hold postbox object all animations
    const animationClipsRef = useRef({});

    //Initialize startup material settings
    useEffect(() => {
      if(postBoxRef.current)
      {
        postBoxRef.current.material.transparent = true;
        postBoxRef.current.material.opacity = 0;
      }

      if(letterJtRef.current)
        {
          letterJtRef.current.material.transparent = true;
          letterJtRef.current.material.opacity = 0;
        }

      if(coverRef.current)
        {
          coverRef.current.material.transparent = true;
          coverRef.current.material.opacity = 0;
        }

        //Initialize animations
        const orginalClip = animations[0];

        const postbox_appear = THREE.AnimationUtils.subclip(orginalClip, 'postbox_appear', 1, 26);
        const postbox_disappear = THREE.AnimationUtils.subclip(orginalClip, 'postbox_disappear', 26, 43);
   
        animationClipsRef.current = {
          appear: mixer.clipAction(postbox_appear),
          disappear: mixer.clipAction(postbox_disappear),
        };
  

    }, [materials, actions, mixer, ref])

    //Play animations based on the current animation
    useEffect(() => {
        if(animationClipsRef.current)
        {

          animationClipsRef.current.appear.setLoop(THREE.LoopOnce, 1);
          animationClipsRef.current.disappear.setLoop(THREE.LoopOnce, 1);

          animationClipsRef.current.appear.reset();
          animationClipsRef.current.disappear.reset();

          switch(curAnim)
          {
            case "appear":
              animationClipsRef.current.appear.play();
            break;
            case "disappear":
              animationClipsRef.current.disappear.play();
            break;
          }

          return () => {
            animationClipsRef.current.appear.reset();
            animationClipsRef.current.disappear.reset();
            animationClipsRef.current.appear.stop();
            animationClipsRef.current.disappear.stop();
          };
    }

    }, [curAnim]);



    //Attach object to the letter joint
    useEffect(() => {
      if (letterJtRef.current) {
        // Access a specific joint from the skeleton
        const joint = letterJtRef.current.skeleton.bones.find(bone => bone.name === 'jt_letter');
  
        if (joint) {
          // Create the custom object (a small sphere in this example)
          // const customObject = new THREE.Mesh(
          //   new THREE.BoxGeometry(),
          //   new THREE.MeshStandardMaterial({ color: 'blue', transparent: true, opacity: 0 })
          // );
          //Create Three Group instead of creating a mesh otherwise Three Html UI will not occlude with the mesh
          const customGroup = new THREE.Group();
  
          // Parent the custom object to the joint
          joint.add(customGroup);
          cusObjectRef.current = customGroup;
  
          // Optionally, adjust the custom object's position relative to the joint
          customGroup.position.set(0, -0.8, 0.01); // Example offset
          customGroup.rotation.set(0, 0, 0);// Example offset

          // Update the world matrix of the custom object
          customGroup.updateWorldMatrix(true, true);
      
        }
      }

    }, [nodes]);

    useEffect(()=>{
      setCurAnim("");
        if(isLoaded)
        {
          if(valtioSnap.activeRoute === "Application")
          {
            postBoxRef.current.material.opacity = 0;
            setTimeout(() => {
              setCurAnim("appear");
              }, 500);
          }
          else
          {
            setCurAnim("disappear");
          }
          
        }

    }, [isLoaded, valtioSnap.activeRoute])


    //Handle stuff on update
    useFrame((state, delta)=>{

      //Get cutom object position realtime and map into the letter HtnlUI ref
      if(cusObjectRef.current)
      {
          const worldPosition = new THREE.Vector3();
          const worldRotation = new THREE.Quaternion();
          const worldScale = new THREE.Vector3();

          cusObjectRef.current.getWorldPosition(worldPosition);
          cusObjectRef.current.getWorldQuaternion(worldRotation);
          cusObjectRef.current.getWorldScale(worldScale);

          const eulerRotation = new THREE.Euler().setFromQuaternion(worldRotation, 'XYZ');

          letterTransformRef.current.position.copy(worldPosition);
          letterTransformRef.current.rotation.copy(eulerRotation);
          letterTransformRef.current.scale.copy(worldScale);
      }

      //Control object material animation according to the current animation
      if(postBoxRef.current)
      {
        switch(curAnim)
        {
          case "appear":
            if(postBoxRef.current.material.opacity < 1)
              postBoxRef.current.material.opacity = postBoxRef.current.material.opacity + delta * 2;
            break;
          case "disappear":
            if(postBoxRef.current.material.opacity > 0)
               postBoxRef.current.material.opacity = postBoxRef.current.material.opacity - delta * 2;
            break;
        }
        
      }
         
    })


  return (
    <>
    {/* Attach letter ui into our custom object that inside in the letter joint */}
    <group ref={letterTransformRef}>
      {/* <mesh>
        <boxGeometry />
        <meshStandardMaterial color='red' />
      </mesh> */}
          <Html 
            className={`w-[334px] h-[595px] overflow-y-auto scale-[3.28]
            ${valtioSnap.activeRoute === "Application" ? 'canvas-overlays-visible' : 'canvas-overlays-hidden'}`}
             transform occlude zIndexRange={[0, 5]} distanceFactor={4}
            >
               <div className={`w-full h-full flex items-center justify-center`} onPointerDown={(e) => e.stopPropagation()} >
                 <Provider store={store}>
                    <ApplicationForm isVisible={isAppFormVisible} />
                 </Provider>
               </div>
         </Html>
   </group>


    <group ref={ref}  position={[0, -3.4, 0]} scale={0.3} dispose={null}>
      
      <primitive object={nodes['jt_root']} />

      <skinnedMesh 
              ref={postBoxRef}
              castShadow 
              receiveShadow 
              geometry={nodes['postbox_lowres'].geometry} 
              skeleton={nodes['postbox_lowres'].skeleton} 
              material={ materials['postbox_mat']} 
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100} />
      
      <skinnedMesh 
              ref={coverRef}
              castShadow 
              receiveShadow 
              geometry={nodes['cover'].geometry} 
              skeleton={nodes['cover'].skeleton} 
              material={ materials['cover_mat']} 
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100} />


      <skinnedMesh 
              ref={letterJtRef}
              castShadow 
              receiveShadow 
              geometry={nodes['letter'].geometry} 
              skeleton={nodes['letter'].skeleton} 
              material={ materials['letter_mat']} 
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100} />
  </group>
  </>
  )
}

export default Postbox