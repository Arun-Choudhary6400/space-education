import React, { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSelect, useTexture } from "@react-three/drei";
import { getFresnelMat } from "./hooks/getFresneMat";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../Redux/Homepage/slice";
import { selectActivePlanets } from "../Redux/Homepage/selector";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Earth = (props) => {
  const earthGroup = useRef();
  const activePlanet = useSelector(selectActivePlanets)
  const dispatch = useDispatch();

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
  // Animate the Earth position on scroll
  useLayoutEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".second-section", // The section triggering the animation
        start: "top 50%", // Start when the section reaches the top
        end: "bottom 50%", // End when the bottom of the section reaches the top
      },
    });
    tl.to(earthGroup.current.position, {
      x: -1, // Adjust z for depth if needed
      y: 1.5, // Center vertically
      z: -1.7, // Move to the right
      duration: 1.3, // Transition duration
    });

   const thSecTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".third-section",
        start: "top 50%",
        end: "bottom 50%",
        // scrub: true
      },
    });
    thSecTl.to(earthGroup.current.position, {
      x: 1.7,
      y: 1.5,
      z: 0,
      duration: 1.3,
    });
    // thSecTl.to(earthGroup.current.position, {
    //   x: 0.9,
    //   y: -3,
    //   z: 0,
    //   duration: 3,
    // }, 3);
  }, []);

  useFrame(() => {
    earthGroup.current.rotation.y += 0.008;
  });

  return (
    <group
      {...props}
      ref={earthGroup}
      rotation={[(-23.4 * Math.PI) / 180, 0, 0]}
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

const EarthScene = () => (
  <>
    <directionalLight position={[-2, 1.5, 1.5]} intensity={1} />
    <Earth />
  </>
);

export default EarthScene;
