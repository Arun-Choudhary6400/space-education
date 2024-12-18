import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { getFresnelMat } from "./hooks/getFresneMat";

const Moon = () => {
  const moonGroup = useRef();

  // Load textures
  const textures = {
    map: useTexture("/textures/moon/2k_moon.jpg"),
    bumpMap: useTexture("/textures/moon/moonbump2k.jpg"),
  };

  // Create materials
  const moonMaterial = new THREE.MeshPhongMaterial({
    map: textures.map,
    bumpMap: textures.bumpMap,
    bumpScale: 0.5,
  });

  const fresnelMaterial = getFresnelMat(0xaaaaaa);

  useFrame(() => {
    moonGroup.current.rotation.y += 0.008;
  });

  return (
    <group ref={moonGroup} rotation={[(-23.4 * Math.PI) / 180, 0, 0]}>
      <mesh
        geometry={new THREE.IcosahedronGeometry(1, 12)}
        material={moonMaterial}
      />
      <mesh
        geometry={new THREE.IcosahedronGeometry(1, 12)}
        material={fresnelMaterial}
        scale={[1.01, 1.01, 1.01]}
      />
    </group>
  );
};

const MoonScene = () => (
  <>
    {/* <ambientLight intensity={0.5} /> */}
    <directionalLight position={[-2, 1.5, 1.5]} intensity={2} />
    <Moon />
    {/* <OrbitControls /> */}
  </>
);

export default MoonScene;
