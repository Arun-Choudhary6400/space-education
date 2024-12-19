import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
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
import { changePlanetPosition } from "./hooks/changePlanetPosition";
import { Box } from "@mui/material";

export const CanvasContainer = () => {
  const dispatch = useDispatch();
  const planetGroupRef = useRef();
  const [rotation, setRotation] = useState(0);
  const activePlanet = useSelector(selectActivePlanets);
  const planetsList = useSelector(selectPlanetsList);

  useEffect(() => {
    setRotation(rotation + -Math.PI / 2);
  }, [activePlanet.position]);

  const radius = 12;
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
  //   if (activePlanet.name == "EARTH") {
  //     changePlanetPosition(earthRef);
  //   } else if (activePlanet.name == "JUPITER") {
  //     changePlanetPosition(jupiterRef);
  //   } else if (activePlanet.name == "MARS") {
  //     changePlanetPosition(marsRef);
  //   } else if (activePlanet.name == "MOON") {
  //     changePlanetPosition(moonRef);
  //   }
  // }, [activePlanet]);

  return (
    <>
      <Canvas
        eventSource={document.body}
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
            <group key={planet.name}>
              {planet.name == "EARTH" ? (
                <EarthScene
                  planetName={planet.name}
                  offset={(index / planets.length) * Math.PI * 2}
                />
              ) : planet.name == "MOON" ? (
                <MoonScene
                  planetName={planet.name}
                  offset={(index / planets.length) * Math.PI * 2}
                />
              ) : planet.name == "MARS" ? (
                <MarsScene
                  planetName={planet.name}
                  offset={(index / planets.length) * Math.PI * 2}
                />
              ) : planet.name == "JUPITER" ? (
                <JupiterScene
                  planetName={planet.name}
                  offset={(index / planets.length) * Math.PI * 2}
                />
              ) : (
                ""
              )}
            </group>
            // <Planet
            //   planetName={planet.name}
            //   key={planet.name}
            //   // ref={activePlanet.name == planet.name ? planetRef : null}
            //   Component={planet.Component}
            //   radius={radius}
            //   offset={(index / planets.length) * Math.PI * 2}
            // />
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
