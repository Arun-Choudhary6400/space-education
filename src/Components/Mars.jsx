import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { getFresnelMat } from "./hooks/getFresneMat";
import { changePlanetPosition } from "./hooks/changePlanetPosition";
import { useSelector } from "react-redux";
import { selectActivePlanets } from "../Redux/Homepage/selector";

const Mars = ({ planetName, offset }) => {
  const marsGroup = useRef();
  const activePlanet = useSelector(selectActivePlanets);
  // /planet position
  const radius = 12;
  // const defaultPosition = [-12, -1.5, 1.4695761589768238e-15];
  // let position = useMemo(() => {
  //   const x = radius * Math.cos(offset);
  //   const z = radius * Math.sin(offset);
  //   return [x, -1.5, z];
  // }, [radius, offset]);

  const defaultPosition = [-12, -1.5, 1.4695761589768238e-15];
  const calculatedPosition = useMemo(() => {
    const x = radius * Math.cos(offset);
    const z = radius * Math.sin(offset);
    return [x, -1.5, z];
  }, [radius, offset]);

  useLayoutEffect(() => {
    if (marsGroup.current) {
      if (activePlanet.name === "MARS") {
        marsGroup.current.position.set(...calculatedPosition);
        changePlanetPosition(marsGroup); // Additional animations if needed
      } else {
        marsGroup.current.position.set(...defaultPosition);
      }
    }
  }, [activePlanet, calculatedPosition, defaultPosition]);

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
    <group
      ref={marsGroup}
      rotation={[(-23.4 * Math.PI) / 180, 0, 0]}
      // position={positionRef.current}
    >
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

const MarsScene = ({ planetName, offset }) => (
  <>
    <directionalLight position={[-2, 1.5, 1.5]} intensity={2} />
    <Mars planetName={planetName} offset={offset} />
  </>
);

export default MarsScene;
