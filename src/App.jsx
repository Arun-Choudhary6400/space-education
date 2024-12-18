import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import getStarfield from "./Components/hooks/getStarField";
import EarthScene from "./Components/Earth";
import MoonScene from "./Components/Moon";
import MarsScene from "./Components/Mars";
import JupiterScene from "./Components/Jupiter";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import { UI } from "./Components/UI";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActivePlanets,
  selectPlanetsList,
} from "./Redux/Homepage/selector";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import InfiniteCarousel from "./Components/InfiniteCarousel";
import { actions } from "./Redux/Homepage/slice";
import Navbar from "./Components/Layouts/Navbar";
import { Box } from "@mui/material";
import Overlay from "./Components/Overlay";
import { CanvasContainer } from "./Components/CanvasContainer";
import MoreInfo from "./Components/MoreInfo";
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

  // const containerRef = useRef(null);

  // useEffect(() => {
  //   const sections = gsap.utils.toArray(".section");
  //   console.log("section", sections);
    
  //   const container = containerRef.current;

  //   // Set up the scroll logic
  //   gsap.to(sections, {
  //     xPercent: -100 * (sections.offsetHeight - 1),
  //     ease: "linear",
  //     scrollTrigger: {
  //       trigger: container,
  //       start: "top top",
  //       end: () => `+=${100 * sections.offsetHeight}px`,
  //       // pin: true,
  //       // scrub: true,
  //       snap: 1 / (sections.offsetHeight - 1),
  //     },
  //   });
  // }, []);
  const sectionsRef = useRef([]);
  const currentSection = useRef(0);
  const scrollDistance = useRef(0); // Track cumulative scroll distance

  // const handleWheel = (e) => {
  //   const direction = e.deltaY > 0 ? 1 : -1; // Scroll direction
  //   const nextSection = currentSection.current + direction;

  //   // Clamp the section index to avoid overscrolling
  //   if (nextSection >= 0 && nextSection < sectionsRef.current.length) {
  //     currentSection.current = nextSection;

  //     gsap.to(window, {
  //       scrollTo: {
  //         y: sectionsRef.current[nextSection],
  //       },
  //       duration: 1.5, // Smooth transition duration
  //     });
  //   }
  // };

  const handleWheel = (e) => {
    scrollDistance.current += e.deltaY;

    if (Math.abs(scrollDistance.current) >= 200) {
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
            zIndex: -1
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
