import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectHideOtherPlanets,
  selectActivePlanets,
} from "../Redux/Homepage/selector";
import { changePlanetPosition } from "./hooks/changePlanetPosition";

export const Planet = ({ Component, radius, offset, planetName }) => {
  const activePlanet = useSelector(selectActivePlanets);
  const hideOtherPlanets = useSelector(selectHideOtherPlanets);
  const groupRef = useRef();
  const planetRef = useRef();
  const position = useMemo(() => {
    const x = radius * Math.cos(offset);
    const z = radius * Math.sin(offset);
    return [x, -1.5, z];
  }, [radius, offset]);

  // useLayoutEffect(() => {
  //   if (activePlanet.name == "EARTH") {
  //     changePlanetPosition(planetRef);
  //   } else if (activePlanet.name == "JUPITER") {
  //     changePlanetPosition(planetRef);
  //   } else if (activePlanet.name == "MARS") {
  //     changePlanetPosition(planetRef);
  //   } else if (activePlanet.name == "MOON") {
  //     changePlanetPosition(planetRef);
  //   }
  // }, [activePlanet]);


  return (
    <>
      {hideOtherPlanets == false && (
        <group
          // rotation-y={rotation}
          position={position}
          ref={groupRef}
        >
          <group>
            <Component />
          </group>
        </group>
      )}
    </>
  );
};
