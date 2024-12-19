import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { getFresnelMat } from "./hooks/getFresneMat";
import { changePlanetPosition } from "./hooks/changePlanetPosition";
import { useSelector } from "react-redux";
import { selectActivePlanets } from "../Redux/Homepage/selector";

const Jupiter = ({ planetName, offset }) => {
  const jupiterGroup = useRef();
  const activePlanet = useSelector(selectActivePlanets);
  // /planet position
  const radius = 12;
  const defaultPosition = [-2.204364238465236e-15, -1.5, -12];
  // let position = useMemo(() => {
  //   const x = radius * Math.cos(offset);
  //   const z = radius * Math.sin(offset);
  //   return [x, -1.5, z];
  // }, [radius, offset]);

  // useLayoutEffect(() => {
  //   if (activePlanet.name == "JUPITER") {
  //     changePlanetPosition(jupiterGroup);
  //   } else {
  //     position = defaultPosition;
  //   }
  // }, [activePlanet]);

  const calculatedPosition = useMemo(() => {
    const x = radius * Math.cos(offset);
    const z = radius * Math.sin(offset);
    return [x, -1.5, z];
  }, [radius, offset]);

  useLayoutEffect(() => {
    if (jupiterGroup.current) {
      if (activePlanet.name === "JUPITER") {
        jupiterGroup.current.position.set(...calculatedPosition);
        changePlanetPosition(jupiterGroup); // Additional animations if needed
      } else {
        jupiterGroup.current.position.set(...defaultPosition);
      }
    }
  }, [activePlanet, calculatedPosition, defaultPosition]);

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
    <group
      ref={jupiterGroup}
      rotation={[(-23.4 * Math.PI) / 180, 0, 0]}
      // position={position}
    >
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

const JupiterScene = ({ planetName, offset }) => (
  <>
    <directionalLight position={[-2, 1.5, 1.5]} intensity={2} />
    <Jupiter planetName={planetName} offset={offset} />
  </>
);

export default JupiterScene;
