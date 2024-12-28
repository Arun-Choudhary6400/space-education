import React, { useEffect, useRef } from "react";
import "./App.css";
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
import { ReactLenis, useLenis } from "lenis/react";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

function App() {
  const dispatch = useDispatch();
  const activePlanet = useSelector(selectActivePlanets);
  const sectionsRef = useRef([]);
  const isScrolling = useRef(false);
  const scrollAccumulator = useRef(0);
  const SCROLL_THRESHOLD = 400; // Increased threshold for scroll accumulation

  useEffect(() => {
    const sections = sectionsRef.current.filter(Boolean);

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          if (!isScrolling.current) {
            scrollToSection(section);
          }
        },
        onEnterBack: () => {
          if (!isScrolling.current) {
            scrollToSection(section);
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToSection = (section) => {
    isScrolling.current = true;
    gsap.to(window, {
      scrollTo: { y: section, autoKill: false },
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        setTimeout(() => {
          isScrolling.current = false;
          scrollAccumulator.current = 0;
        }, 100);
      },
    });
  };

  const handleWheel = (e) => {
    if (isScrolling.current) {
      e.preventDefault();
      return;
    }

    scrollAccumulator.current += Math.abs(e.deltaY);

    if (scrollAccumulator.current >= SCROLL_THRESHOLD) {
      const sections = sectionsRef.current.filter(Boolean);
      const currentSection = sections.findIndex(
        (section) =>
          Math.abs(window.scrollY - section.offsetTop) < window.innerHeight / 2
      );

      if (currentSection === -1) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(
        0,
        Math.min(currentSection + direction, sections.length - 1)
      );

      if (currentSection !== nextIndex) {
        e.preventDefault();
        scrollToSection(sections[nextIndex]);
      }
      scrollAccumulator.current = 0;
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis options={{ autoRaf: false }} ref={lenisRef}>
      <Box>
        <Navbar />
        <CanvasContainer />
        <Overlay ref={(el) => (sectionsRef.current[0] = el)} />
        <InfiniteCarousel ref={(el) => (sectionsRef.current[1] = el)} />
        <MoreInfo ref={(el) => (sectionsRef.current[2] = el)} />
      </Box>
    </ReactLenis>
  );
}

export default App;
