import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { getFresnelMat } from "./hooks/getFresneMat";

const Jupiter = () => {
  const jupiterGroup = useRef();

  // Load textures
  const textures = {
    map: useTexture("/textures/jupiter/jupiter2_2k.jpg"),
    dayMap: useTexture("/textures/jupiter/jupitermap.jpg"),
  };

  // Create materials
  const jupiterMaterial = new THREE.MeshPhongMaterial({
    map: textures.map,
  });
  const fresnelMaterial = getFresnelMat(0xaaaaaa);

  useFrame(() => {
    jupiterGroup.current.rotation.y += 0.008;
  });

  return (
    <group ref={jupiterGroup} rotation={[(-23.4 * Math.PI) / 180, 0, 0]}>
      <mesh
        geometry={new THREE.IcosahedronGeometry(1, 12)}
        material={jupiterMaterial}
      />
      <mesh
        geometry={new THREE.IcosahedronGeometry(1, 12)}
        material={fresnelMaterial}
        scale={[1.01, 1.01, 1.01]}
      />
    </group>
  );
};

const JupiterScene = () => (
  <>
    <directionalLight position={[-2, 1.5, 1.5]} intensity={2} />
    <Jupiter />
  </>
);

export default JupiterScene;
