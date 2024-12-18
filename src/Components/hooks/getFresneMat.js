import * as THREE from "three";

export const getFresnelMat = (color = 0x44b3c2) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      fresnelColor: { value: new THREE.Color(color) },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      uniform vec3 fresnelColor;
      void main() {
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
        gl_FragColor = vec4(fresnelColor * fresnel, fresnel);
      }
    `,
    transparent: true,
  });
};
