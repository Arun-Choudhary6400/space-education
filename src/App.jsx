import React, { useEffect, useRef } from "react";
import "./App.css";
import EarthScene from "./Components/Earth";
import MoonScene from "./Components/Moon";
import MarsScene from "./Components/Mars";
import JupiterScene from "./Components/Jupiter";
import { useDispatch, useSelector } from "react-redux";
import { selectActivePlanets } from "./Redux/Homepage/selector";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import InfiniteCarousel from "./Components/InfiniteCarousel";
import Navbar from "./Components/Layouts/Navbar";
import { Box } from "@mui/material";
import Overlay from "./Components/Overlay";
import { CanvasContainer } from "./Components/CanvasContainer";
import MoreInfo from "./Components/MoreInfo";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

function App() {
  const dispatch = useDispatch();
  const activePlanet = useSelector(selectActivePlanets);
  const sectionsRef = useRef([]);
  const currentSection = useRef(0);
  const scrollDistance = useRef(0); // Track cumulative scroll distance

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
            autoKill: false
          },
          duration: 1, // Smooth transition duration
        });
      }

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
