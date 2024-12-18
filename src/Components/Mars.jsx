import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { getFresnelMat } from "./hooks/getFresneMat";

const Mars = () => {
  const marsGroup = useRef();

  // Load textures
  const textures = {
    map: useTexture("/textures/mars/2k_mars.jpg"),
  };

  // Create materials
  const marsMaterial = new THREE.MeshPhongMaterial({
    map: textures.map,
  });
  const fresnelMaterial = getFresnelMat(0xd38080);

  useFrame(() => {
    marsGroup.current.rotation.y += 0.008;
  });

  return (
    <group ref={marsGroup} rotation={[(-23.4 * Math.PI) / 180, 0, 0]}>
      <mesh
        geometry={new THREE.IcosahedronGeometry(1, 12)}
        material={marsMaterial}
      />
      <mesh
        geometry={new THREE.IcosahedronGeometry(1, 12)}
        material={fresnelMaterial}
        scale={[1.01, 1.01, 1.01]}
      />
    </group>
  );
};

const MarsScene = () => (
  <>
    <directionalLight position={[-2, 1.5, 1.5]} intensity={2} />
    <Mars />
  </>
);

export default MarsScene;
