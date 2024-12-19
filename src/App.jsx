import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import EarthScene from "./Components/Earth";
import MoonScene from "./Components/Moon";
import MarsScene from "./Components/Mars";
import JupiterScene from "./Components/Jupiter";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActivePlanets,
  selectPlanetsList,
} from "./Redux/Homepage/selector";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import InfiniteCarousel from "./Components/InfiniteCarousel";
import Navbar from "./Components/Layouts/Navbar";
import { Box } from "@mui/material";
import Overlay from "./Components/Overlay";
import { CanvasContainer } from "./Components/CanvasContainer";
import MoreInfo from "./Components/MoreInfo";
import { actions } from "./Redux/Homepage/slice";
gsap.registerPlugin(ScrollToPlugin);

function App() {
  const dispatch = useDispatch();
  const planetGroupRef = useRef();
  const [rotation, setRotation] = useState(0);
  const activePlanet = useSelector(selectActivePlanets);
  const planetsList = useSelector(selectPlanetsList);
  let noOfPlanet = 4;

  // setTimeout(() => {
  //   if (activePlanet.position == noOfPlanet) {
  //     dispatch(
  //       actions.setActivePlanet({
  //         name: "EARTH",
  //         position: 1,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       actions.setActivePlanet({
  //         name: planets[activePlanet.position].name,
  //         position: activePlanet.position + 1,
  //       })
  //     );
  //   }
  // }, 5000);

  useEffect(() => {
    setRotation(rotation + -Math.PI / 2);
  }, [activePlanet]);

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
  }, [activePlanet]);

  const sectionsRef = useRef([]);
  const currentSection = useRef(0);
  const scrollDistance = useRef(0); // Track cumulative scroll distance

  const handleWheel = (e) => {
    scrollDistance.current += e.deltaY;

    if (Math.abs(scrollDistance.current) >= 250) {
      const direction = scrollDistance.current > 0 ? 1 : -1; // Determine scroll direction
      const nextSection = currentSection.current + direction;

      // Clamp the section index to avoid overscrolling
      if (nextSection >= 0 && nextSection < sectionsRef.current.length) {
        currentSection.current = nextSection;

        gsap.to(window, {
          scrollTo: {
            y: sectionsRef.current[nextSection],
          },
          duration: 1, // Smooth transition duration
        });
      }
      // dispatch(actions.toggleHideOtherPlanets(true))

      // Reset scroll distance
      scrollDistance.current = 0;
    }
  };

  useEffect(() => {
    // Attach scroll event
    window.addEventListener("wheel", handleWheel);

    return () => {
      // Clean up event listener
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <Box>
        <Navbar />
        <Box
          sx={{
            height: "100vh",
            weight: "100vw",
            position: "fixed",
            top: 0,
            zIndex: -1,
          }}
        >
          <CanvasContainer />
        </Box>
        <Overlay ref={(el) => (sectionsRef.current[0] = el)} />
        <InfiniteCarousel ref={(el) => (sectionsRef.current[1] = el)} />
        <MoreInfo ref={(el) => (sectionsRef.current[2] = el)} />
      </Box>
    </>
  );
}

export default App;
const planets = [
  { Component: EarthScene, name: "EARTH" },
  { Component: MoonScene, name: "MOON" },
  { Component: MarsScene, name: "MARS" },
  { Component: JupiterScene, name: "JUPITER" },
];
