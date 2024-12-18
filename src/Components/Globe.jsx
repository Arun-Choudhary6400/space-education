import React, { useMemo } from "react";
import * as THREE from "three";
import { useLoader, extend } from "@react-three/fiber";

extend({ PointsMaterial: THREE.PointsMaterial });

const Globe = ({ colorMap, elevMap, alphaMap }) => {
  const detail = 120;

  // Load textures
  const colorTexture = useLoader(THREE.TextureLoader, colorMap);
  const elevTexture = useLoader(THREE.TextureLoader, elevMap);
  const alphaTexture = useLoader(THREE.TextureLoader, alphaMap);

  // Geometry
  const pointsGeo = useMemo(() => new THREE.IcosahedronGeometry(1, detail), [detail]);

  // Uniforms
  const uniforms = useMemo(
    () => ({
      size: { value: 4.0 },
      colorTexture: { value: colorTexture },
      elevTexture: { value: elevTexture },
      alphaTexture: { value: alphaTexture },
    }),
    [colorTexture, elevTexture, alphaTexture]
  );

  // Shaders
  const vertexShader = `
    uniform float size;
    uniform sampler2D elevTexture;

    varying vec2 vUv;
    varying float vVisible;

    void main() {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      float elv = texture2D(elevTexture, vUv).r;
      vec3 vNormal = normalMatrix * normal;
      vVisible = step(0.0, dot( -normalize(mvPosition.xyz), normalize(vNormal)));
      mvPosition.z += 0.35 * elv;
      gl_PointSize = size;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform sampler2D colorTexture;
    uniform sampler2D alphaTexture;

    varying vec2 vUv;
    varying float vVisible;

    void main() {
      if (floor(vVisible + 0.1) == 0.0) discard;
      float alpha = 1.0 - texture2D(alphaTexture, vUv).r;
      vec3 color = texture2D(colorTexture, vUv).rgb;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <points>
      {/* Geometry */}
      <bufferGeometry attach="geometry" {...pointsGeo} />

      {/* Material */}
      <shaderMaterial
        attach="material"
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </points>
  );
};

export default Globe;
