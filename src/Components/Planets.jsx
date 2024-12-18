import React, { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectHideOtherPlanets,
  selectActivePlanets,
} from "../Redux/Homepage/selector";

export const Planet = ({ Component, radius, offset, planetName }) => {
  const { name } = useSelector(selectActivePlanets);
  const hideOtherPlanets = useSelector(selectHideOtherPlanets);
  //   const [planetToShow, setSlanetToShow] = useState(name);
  const groupRef = useRef();
  const position = useMemo(() => {
    const x = radius * Math.cos(offset);
    const z = radius * Math.sin(offset);
    return [x, 0, z];
  }, [radius, offset]);

  return (
    <>
      {hideOtherPlanets == false && (
        <group
          // rotation-y={rotation}
          position={position}
          ref={groupRef}
        >
          <group position-y={-1.5}>
            <Component />
          </group>
        </group>
      )}
    </>
  );
};
