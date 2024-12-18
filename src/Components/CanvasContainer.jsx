import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Planet } from "./Planets";
import { StarField } from "./StarField";
import EarthScene from "./Earth";
import MoonScene from "./Moon";
import MarsScene from "./Mars";
import JupiterScene from "./Jupiter";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActivePlanets,
  selectPlanetsList,
} from "../Redux/Homepage/selector";
import gsap from "gsap";

export const CanvasContainer = () => {
  const dispatch = useDispatch();
  const planetGroupRef = useRef();
  const planetRef = useRef();
  const [rotation, setRotation] = useState(0);
  const activePlanet = useSelector(selectActivePlanets);
  const planetsList = useSelector(selectPlanetsList);

  useEffect(() => {
    setRotation(rotation + -Math.PI / 2);
  }, [activePlanet.position]);

  const radius = 12;
  const speed = 0.05;
  const tl = useRef();

  useLayoutEffect(() => {
    if (planetGroupRef.current) {
      tl.current = gsap.timeline();
      tl.current.to(planetGroupRef.current.rotation, {
        duration: 1,
        x: 0,
        y: rotation + -Math.PI / 2,
        z: 0,
        overwrite: "auto",
      });
    }
  }, [activePlanet.position]);

  // useLayoutEffect(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".second-section", // The section triggering the animation
  //       start: "top 50%", // Start when the section reaches the top
  //       end: "bottom 50%", // End when the bottom of the section reaches the top
  //     },
  //   });
  //   tl.to(planetRef.current.position, {
  //     x: -1, // Adjust z for depth if needed
  //     y: 1.5, // Center vertically
  //     z: -1.7, // Move to the right
  //     duration: 1.3, // Transition duration
  //   });

  //   const thSecTl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".third-section",
  //       start: "top 50%",
  //       end: "bottom 50%",
  //       // scrub: true
  //     },
  //   });
  //   thSecTl.to(planetRef.current.position, {
  //     x: 1.7,
  //     y: 1.5,
  //     z: 0,
  //     duration: 1.3,
  //   });
  //   // thSecTl.to(earthGroup.current.position, {
  //   //   x: 0.9,
  //   //   y: -3,
  //   //   z: 0,
  //   //   duration: 3,
  //   // }, 3);
  // }, []);

  // useFrame(() => {
  //   planetRef.current.rotation.y += 0.008;
  // });

  return (
    <>
      <Canvas
        dpr={[1, 2]}
        style={{ height: "100vh", width: "100vw" }}
        camera={{
          // fov: 55,
          fov: 44,
          position: [0, 0, 15],
        }}
      >
        <color attach={"background"} args={["#000"]} />
        <group name="Planets" rotation-y={rotation} ref={planetGroupRef}>
          {planets.map((planet, index) => (
            <Planet
              planetName={planet.name}
              key={planet.name}
              // ref={activePlanet.name == planet.name ? planetRef : null}
              Component={planet.Component}
              radius={radius}
              offset={(index / planets.length) * Math.PI * 2}
            />
          ))}
        </group>
        <StarField />
      </Canvas>
    </>
  );
};

const planets = [
  { Component: EarthScene, name: "EARTH" },
  { Component: MoonScene, name: "MOON" },
  { Component: MarsScene, name: "MARS" },
  { Component: JupiterScene, name: "JUPITER" },
];
