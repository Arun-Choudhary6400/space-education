import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { getFresnelMat } from "./hooks/getFresneMat";
import { changePlanetPosition } from "./hooks/changePlanetPosition";
import { useSelector } from "react-redux";
import { selectActivePlanets } from "../Redux/Homepage/selector";
import { defaultPlanetPosition } from "./hooks/defaultPlanetPosition";

const Moon = ({ planetName, offset }) => {
  const moonGroup = useRef();
  const activePlanet = useSelector(selectActivePlanets);
  // /planet position
  const radius = 12;
  const defaultPosition = [7.347880794884119e-16, -1.5, 12];
  // let position = useMemo(() => {
  //   const x = radius * Math.cos(offset);
  //   const z = radius * Math.sin(offset);
  //   return [x, -1.5, z];
  // }, [radius, offset]);

  const calculatedPosition = useMemo(() => {
    const x = radius * Math.cos(offset);
    const z = radius * Math.sin(offset);
    return [x, -1.5, z];
  }, [radius, offset]);

  useLayoutEffect(() => {
    if (moonGroup.current) {
      if (activePlanet.name === "MOON") {
        moonGroup.current.position.set(...calculatedPosition);
        changePlanetPosition(moonGroup); // Additional animations if needed
      } else {
        moonGroup.current.position.set(...defaultPosition);
      }
    }
  }, [activePlanet, calculatedPosition, defaultPosition]);

  // useLayoutEffect(() => {
  //   if (activePlanet.name == "MOON") {
  //     changePlanetPosition(moonGroup);
  //   } else {
  //     position = defaultPosition;
  //   }
  // }, [activePlanet]);

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
    <group
      ref={moonGroup}
      rotation={[(-23.4 * Math.PI) / 180, 0, 0]}
      // position={position}
    >
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

const MoonScene = ({ planetName, offset }) => (
  <>
    {/* <ambientLight intensity={0.5} /> */}
    <directionalLight position={[-2, 1.5, 1.5]} intensity={2} />
    <Moon planetName={planetName} offset={offset} />
    {/* <OrbitControls /> */}
  </>
);

export default MoonScene;
