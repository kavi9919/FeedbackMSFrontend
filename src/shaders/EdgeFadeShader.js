import * as THREE from 'three';
import { extend } from '@react-three/fiber';


export default class EdgeFadeShader extends THREE.MeshStandardMaterial {
    constructor(parameters = {}) {
      super(parameters);
  
      // Add custom uniforms
      this.edgeTransition = parameters.edgeTransition || 0.3;
      this.fadeOffset = parameters.fadeOffset || 2.0;
  
      // Add uniforms to the material
      this.onBeforeCompile = (shader) => {
        // Add uniforms to the shader
        shader.uniforms.edgeTransition = { value: this.edgeTransition };
        shader.uniforms.fadeOffset = { value: this.fadeOffset };
  
        // Pass UV coordinates to the fragment shader
        shader.vertexShader = `
          varying vec2 vUv;
          ${shader.vertexShader}
        `;
  
        // Calculate vUv in the vertex shader
        shader.vertexShader = shader.vertexShader.replace(
          `#include <uv_vertex>`,
          `
          #include <uv_vertex>
          vUv = uv;
          `
        );
  
        // Inject custom logic into the fragment shader
        shader.fragmentShader = `
          varying vec2 vUv;
          uniform float edgeTransition;
          uniform float fadeOffset;
          ${shader.fragmentShader}
        `;
  
        shader.fragmentShader = shader.fragmentShader.replace(
          `#include <dithering_fragment>`,
          `
          #include <dithering_fragment>
  
          // Custom logic for edge transition
          float dist = length(vUv - 0.5) * fadeOffset;
          float alpha = smoothstep(0.5, 0.5 - edgeTransition, dist);
          gl_FragColor.a *= alpha;
          `
        );
  
      };
    }
  }
  
  // Register the material so it can be used as a JSX component
  extend({ EdgeFadeShader });