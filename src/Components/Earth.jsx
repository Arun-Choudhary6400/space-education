import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { getFresnelMat } from "./hooks/getFresneMat";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useDispatch, useSelector } from "react-redux";
import { selectActivePlanets } from "../Redux/Homepage/selector";
import { changePlanetPosition } from "./hooks/changePlanetPosition";

// Register the ScrollTrigger plugin

const Earth = ({ planetName, offset, props }) => {
  const earthGroup = useRef();
  const activePlanet = useSelector(selectActivePlanets);
  const dispatch = useDispatch();
  // /planet position
  const radius = 12;
  const defaultPosition = [12, -1.5, 0];
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
      if (earthGroup.current) {
        if (activePlanet.name === "EARTH") {
          earthGroup.current.position.set(...calculatedPosition);
          changePlanetPosition(earthGroup); // Additional animations if needed
        } else {
          earthGroup.current.position.set(...defaultPosition);
        }
      }
    }, [activePlanet, calculatedPosition, defaultPosition]);

  // Load textures
  const textures = {
    map: useTexture("/textures/earth/2k_earth_daymap.jpg"),
    specularMap: useTexture("/textures/earth/earthspec1k.jpg"),
    bumpMap: useTexture("/textures/earth/earthbump1k.jpg"),
    lightsMap: useTexture("/textures/earth/2k_earth_nightmap.jpg"),
    cloudsMap: useTexture("/textures/earth/2k_earth_clouds.jpg"),
    alphaMap: useTexture("/textures/earth/earthcloudmaptrans.jpg"),
  };

  // Create materials
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: textures.map,
    specularMap: textures.specularMap,
    bumpMap: textures.bumpMap,
    bumpScale: 0.5,
  });

  const lightsMaterial = new THREE.MeshBasicMaterial({
    map: textures.lightsMap,
    blending: THREE.AdditiveBlending,
  });

  const cloudsMaterial = new THREE.MeshStandardMaterial({
    map: textures.cloudsMap,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    alphaMap: textures.alphaMap,
  });

  const fresnelMaterial = getFresnelMat();

  // useLayoutEffect(() => {
  //   if (activePlanet.name == "EARTH") {
  //     changePlanetPosition(earthGroup);
  //   } else {
      
  //     position = defaultPosition;
  //     console.log("default position", position);
  //   }
  // }, [activePlanet]);

  useFrame(() => {
    earthGroup.current.rotation.y += 0.008;
  });

  const handleClick = (e) => {
    const screenWidth = window.innerWidth; // Total width of the screen
    const clickX = e.clientX; // X-coordinate of the click

    if (clickX > screenWidth / 2) {
      console.log("Right");
    } else {
      console.log("Left");
    }
  };

  return (
    <group
      {...props}
      ref={earthGroup}
      rotation={[(-23.4 * Math.PI) / 180, 0, 0]}
      onClick={handleClick}
      // position={position}
    >
      <mesh
        geometry={new THREE.IcosahedronGeometry(1, 12)}
        material={earthMaterial}
      />
      <mesh
        geometry={new THREE.IcosahedronGeometry(1, 12)}
        material={lightsMaterial}
      />
      <mesh
        geometry={new THREE.IcosahedronGeometry(1, 12)}
        material={cloudsMaterial}
        scale={[1.003, 1.003, 1.003]}
      />
      <mesh
        geometry={new THREE.IcosahedronGeometry(1, 12)}
        material={fresnelMaterial}
        scale={[1.01, 1.01, 1.01]}
      />
    </group>
  );
};

const EarthScene = ({ planetName, offset }) => (
  <>
    <directionalLight position={[-2, 1.5, 1.5]} intensity={1} />
    <Earth planetName={planetName} offset={offset} />
  </>
);

export default EarthScene;
