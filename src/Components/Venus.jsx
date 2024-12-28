import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { getFresnelMat } from "./hooks/getFresneMat";

const Venus = () => {
  const venusGroup = useRef();

  // Load textures
  const textures = {
    map: useTexture("/textures/venus/venusmap.jpg"),
    bumpMap: useTexture("/textures/venus/venusbump.jpg"),
  };

  // Create materials
  const venusMaterial = new THREE.MeshPhongMaterial({
    map: textures.map,
    bumpMap: textures.bumpMap,
    bumpScale: 0.5,
  });

  const fresnelMaterial = getFresnelMat(0xaaaaaa);

  useFrame(() => {
    venusGroup.current.rotation.y += 0.008;
  });

  return (
    <group ref={venusGroup} rotation={[(-23.4 * Math.PI) / 180, 0, 0]}>
      <mesh
        geometry={new THREE.IcosahedronGeometry(1, 12)}
        material={venusMaterial}
      />
      <mesh
        geometry={new THREE.IcosahedronGeometry(1, 12)}
        material={fresnelMaterial}
        scale={[1.01, 1.01, 1.01]}
      />
    </group>
  );
};

const VenusScene = () => (
  <>
    <directionalLight position={[-2, 1.5, 1.5]} intensity={2} />
    <Venus />
  </>
);

export default VenusScene;
