import * as THREE from 'three';
import { MeshReflectorMaterial } from '@react-three/drei'
import { LinearEncoding } from '@react-three/drei/helpers/deprecated'
import { useFrame, useLoader } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
import { RepeatWrapping, TangentSpaceNormalMap, TextureLoader, Vector2 } from 'three'
import {updateCommonMatMap, updateCommonMatValue, updateEdgeFadeMatValue} from '../../utils/materialUtils'
import { EdgeFadeShader } from '../../shaders';

const Ground = (props) => {

    const {mainColor = [1, 1, 1], colorMap, normalMap, roughnessMap, materialType = "reflector", envMapIntensity = 0, ...other} = props;
    const groundMatRef = useRef();

    //Load only provided map urls into an array
    const textures = useMemo(() => {
        const maps = [];
        if (colorMap)
            maps.push(process.env.PUBLIC_URL + colorMap.url);
        if (normalMap)
            maps.push(process.env.PUBLIC_URL + normalMap.url);
        if (roughnessMap)
            maps.push(process.env.PUBLIC_URL + roughnessMap.url);
        return maps;
    }, [colorMap, normalMap, roughnessMap]);
    //load those textures from array url
    const loadedTextures = useLoader(TextureLoader, textures);

  
    //Generate usable textures with provided setting from loaded raw textures
    const [color, normal, roughness] = useMemo(() => {
        let colorTexture = null;
        let normalTexture = null;
        let roughnessTexture = null;

        if(colorMap)
        {
            colorTexture = loadedTextures[textures.indexOf(process.env.PUBLIC_URL + colorMap.url)];
            colorTexture.wrapS = RepeatWrapping;
            colorTexture.wrapT = RepeatWrapping;
            colorTexture.repeat.set(colorMap.repeatX, colorMap.repeatY);
            colorTexture.encoding = LinearEncoding;
        }
           
        if(normalMap)
        {
            normalTexture = loadedTextures[textures.indexOf(process.env.PUBLIC_URL + normalMap.url)];
            normalTexture.wrapS = RepeatWrapping;
            normalTexture.wrapT = RepeatWrapping;
            normalTexture.repeat.set(normalMap.repeatX, normalMap.repeatY);
            normalTexture.encoding = LinearEncoding;
        }
           
        if(roughnessMap)
        {
            roughnessTexture = loadedTextures[textures.indexOf(process.env.PUBLIC_URL + roughnessMap.url)];
            roughnessTexture.wrapS = RepeatWrapping;
            roughnessTexture.wrapT = RepeatWrapping;
            roughnessTexture.repeat.set(roughnessMap.repeatX, roughnessMap.repeatY);
            roughnessTexture.encoding = LinearEncoding;
        }
           
        return [colorTexture, normalTexture, roughnessTexture];
    }, [loadedTextures, colorMap, normalMap, roughnessMap]);


    

    useFrame(() => {
        //  console.log(mainColor);
        updateCommonMatValue(groundMatRef, "color", new THREE.Color(mainColor[0], mainColor[1], mainColor[2]));
        updateCommonMatMap(groundMatRef, "diffuse", colorMap, color);
        updateCommonMatMap(groundMatRef, "normal", normalMap, normal);
        updateCommonMatValue(groundMatRef, "normalMapType", TangentSpaceNormalMap);
        const normalScale = new Vector2(normalMap?.normalScale?.x ? normalMap.normalScale.x : 0.15, normalMap?.normalScale?.y ? normalMap.normalScale.y : 0.15);
        updateCommonMatValue(groundMatRef, "normalScale", normalScale);
        updateCommonMatMap(groundMatRef, "roughness", roughnessMap, roughness);
        updateCommonMatValue(groundMatRef, "roughness", roughnessMap?.roughness);
        updateCommonMatValue(groundMatRef, "envMapIntensity", envMapIntensity);

        if (materialType == "edgeFade") 
          {
            updateEdgeFadeMatValue(groundMatRef, "edgeTransition", 0.4);
            updateEdgeFadeMatValue(groundMatRef, "fadeOffset", 2.0);
          }
    })


  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow {...other}>
        <circleGeometry args={[30]} />
      
        {materialType == "reflector" && (

            <MeshReflectorMaterial
                                  ref={groundMatRef}
                                  dithering={true}
                                  color={[0.015, 0.015, 0.015]}
                                  blur={[1000, 400]}
                                  mixBlur={30} 
                                  mixStrength={80}
                                  mixContrast={1}
                                  resolution={1024}
                                  mirror={0}
                                  depthScale={0.01}
                                  minDepthThreshold={0.9}
                                  maxDepthThreshold={1}
                                  depthToBlurRatioBias={0.25}
                                  debug={0}
                                  reflectorOffset={0.2}
                                />
        )}

        {materialType == "edgeFade" && (
            <edgeFadeShader ref={groundMatRef} 
                            transparent  />
        )}

    </mesh>
  )
}


export default Ground