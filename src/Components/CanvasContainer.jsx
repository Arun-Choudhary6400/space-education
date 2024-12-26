import React, { useEffect, useRef, useState } from "react";
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
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { actions } from "../Redux/Homepage/slice";
import { useMediaQuery, useTheme } from "@mui/material";
import PlanetNavigation from "./PlanetsNavigation";

gsap.registerPlugin(ScrollTrigger);

export const CanvasContainer = () => {
  const dispatch = useDispatch();
  const planetGroupRef = useRef();
  const [isSecondSection, setIsSecondSection] = useState(false);
  const [isThirdSection, setIsThirdSection] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const activePlanet = useSelector(selectActivePlanets);
  const planetsList = useSelector(selectPlanetsList);
  const planetsRef = useRef({});
  const carouselPositions = useRef({});
  const currentIndex = useRef(0);
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const lg = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const xl = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const xxl = useMediaQuery(theme.breakpoints.up("xl"));

  // Responsive radius calculation
  const getResponsiveRadius = () => {
    if (sm) return 8;
    if (md) return 10;
    if (xl) return 10;
    return 12; // Desktop
  };

  // Responsive camera settings
  const getCameraSettings = () => {
    if (sm) {
      return {
        fov: 60,
        position: [0, 0, 12],
      };
    }
    if (md) {
      return {
        fov: 50,
        position: [0, 0, 13],
      };
    }
    return {
      fov: 44,
      position: [0, 0, 15],
    };
  };

  const calculateCarouselPosition = (index) => {
    const radius = getResponsiveRadius();
    const angle = (index / planets.length) * Math.PI * 2;
    const yOffset = xxl || lg ? -1.5 : -2; // Adjust vertical position for mobile
    return {
      x: Math.cos(angle) * radius,
      y: yOffset,
      z: Math.sin(angle) * radius,
    };
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update carousel positions when window size changes
  useEffect(() => {
    updateCarouselPositions();
  }, [windowSize]);

  const updateCarouselPositions = () => {
    planets.forEach((planet, index) => {
      carouselPositions.current[planet.name] = calculateCarouselPosition(index);
    });
  };

  const resetGroupPosition = () => {
    if (planetGroupRef.current) {
      const currentYRotation = planetGroupRef.current.rotation.y;
      planetGroupRef.current.position.set(0, 0, 0);
      planetGroupRef.current.rotation.x = 0;
      planetGroupRef.current.rotation.z = 0;
      planetGroupRef.current.rotation.y = currentYRotation;
    }
  };

  const INITIAL_ROTATION = -Math.PI / 2;

  useEffect(() => {
    updateCarouselPositions();
    setTimeout(() => {
      if (planetGroupRef.current) {
        planetGroupRef.current.rotation.y = INITIAL_ROTATION;
      }
    }, 1300);
  }, []);

  const calculateRotationAngle = (currentIndex, newIndex, direction) => {
    const totalPlanets = planets.length;
    let clockwiseDistance =
      (newIndex - currentIndex + totalPlanets) % totalPlanets;
    let counterClockwiseDistance =
      (currentIndex - newIndex + totalPlanets) % totalPlanets;

    if (direction === "next") {
      // For next, we want clockwise rotation (negative angle)
      return clockwiseDistance * ((Math.PI * 2) / totalPlanets);
    } else {
      // For back, we want counter-clockwise rotation (positive angle)
      return -(counterClockwiseDistance * ((Math.PI * 2) / totalPlanets));
    }
  };

  const rotatePlanets = (direction) => {
    if (isRotating) return;

    setIsRotating(true);
    resetGroupPosition();

    let newIndex =
      direction === "next"
        ? (currentIndex.current + 1) % planets.length
        : (currentIndex.current - 1 + planets.length) % planets.length;

    const rotationAngle = calculateRotationAngle(
      currentIndex.current,
      newIndex,
      direction
    );
    const tl = gsap.timeline();

    const currentRotation = planetGroupRef.current.rotation.y;
    const targetRotation = currentRotation + rotationAngle;

    tl.to(planetGroupRef.current.rotation, {
      y: targetRotation,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        resetGroupPosition();
        updateCarouselPositions();
        setIsRotating(false);
      },
    });

    currentIndex.current = newIndex;
    dispatch(
      actions.setActivePlanet({
        name: planets[newIndex].name,
        position: newIndex,
      })
    );
  };

  const handleNext = () => rotatePlanets("next");
  const handleBack = () => rotatePlanets("back");

  // Responsive section positions
  const getResponsiveSectionPositions = () => {
    const scale = sm ? 0.8 : md || lg ? 1.2 : 1.5;

    const secondSectionPosition = {
      MOON: {
        x: sm ? 1.5 : 2.5,
        y: 0,
        z: sm ? 6 : 9,
      },
      JUPITER: {
        x: sm ? -1.5 : -2.5,
        y: 0,
        z: sm ? -6 : -9,
      },
      EARTH: {
        x: sm ? 6 : 9,
        y: 0,
        z: sm ? -1.5 : md ? -2 : xl ? -2 : -2.5,
      },
      MARS: {
        x: sm ? -6 : -9,
        y: 0,
        z: sm ? 1.5 : 2.5,
      },
    };

    const thirdSectionPosition = {
      MOON: {
        x: 0,
        y: 0,
        z: sm ? 10.5 : 12.8,
      },
      JUPITER: {
        x: 0,
        y: 0,
        z: sm ? -10.5 : -12.8,
      },
      EARTH: {
        x: sm ? 10.5 : 12.8,
        y: 0,
        z: 0,
      },
      MARS: {
        x: sm ? -10.5 : -12.8,
        y: 0,
        z: 0,
      },
    };

    return { secondSectionPosition, thirdSectionPosition, scale };
  };

  useEffect(() => {
    const secondSection = document.querySelector(".second-section");
    const thirdSection = document.querySelector(".third-section");
    if (!secondSection || !thirdSection) return;

    const secondSectionTrigger = ScrollTrigger.create({
      trigger: secondSection,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        setIsSecondSection(true);
        setIsThirdSection(false);
      },
      onLeaveBack: () => {
        setIsSecondSection(false);
      },
      onLeave: () => {
        setIsSecondSection(false);
      },
    });

    const thirdSectionTrigger = ScrollTrigger.create({
      trigger: thirdSection,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        setIsThirdSection(true);
        setIsSecondSection(false);
      },
      onLeaveBack: () => {
        setIsThirdSection(false);
        setIsSecondSection(true);
      },
      onLeave: () => {
        setIsThirdSection(false);
      },
    });

    return () => {
      secondSectionTrigger.kill();
      thirdSectionTrigger.kill();
    };
  }, []);

  useEffect(() => {
    if (!planetGroupRef.current) return;

    const activePlanetMesh = planetsRef.current[activePlanet.name];
    if (!activePlanetMesh) return;

    const tl = gsap.timeline();
    const { secondSectionPosition, thirdSectionPosition, scale } =
      getResponsiveSectionPositions();

    if (isSecondSection) {
      tl.to(activePlanetMesh.position, {
        ...secondSectionPosition[activePlanet.name],
        duration: 1,
        ease: "power2.inOut",
      }).to(
        activePlanetMesh.scale,
        {
          x: sm ? scale + 0.4 : scale,
          y: sm ? scale + 0.4 : scale,
          z: sm ? scale + 0.4 : scale,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=1.3"
      );

      Object.entries(planetsRef.current).forEach(([name, mesh]) => {
        if (name !== activePlanet.name) {
          gsap.to(mesh.material, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              mesh.visible = false;
            },
          });
        } else {
          mesh.visible = true;
          gsap.to(mesh.material, { opacity: 1, duration: 0.5 });
        }
      });
    } else if (isThirdSection) {
      tl.to(activePlanetMesh.position, {
        ...thirdSectionPosition[activePlanet.name],
        duration: 1.3,
        ease: "power2.inOut",
      }).to(
        activePlanetMesh.scale,
        {
          x: scale,
          y: scale,
          z: scale,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=1.3"
      );
    } else {
      Object.entries(planetsRef.current).forEach(([name, mesh]) => {
        mesh.visible = true;
        const carouselPos = carouselPositions.current[name];

        tl.to(mesh.position, {
          ...carouselPos,
          duration: 1,
          ease: "power2.inOut",
        })
          .to(
            mesh.scale,
            {
              x: 1,
              y: 1,
              z: 1,
              duration: 1,
              ease: "power2.inOut",
            },
            "-=1"
          )
          .to(
            mesh.material,
            {
              opacity: 1,
              duration: 1,
            },
            "-=1"
          );
      });
    }
  }, [isSecondSection, isThirdSection, activePlanet, windowSize]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isRotating) return; // Ignore keyboard input while rotating

      if (event.key === "ArrowLeft") {
        handleBack();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isRotating]);

  const cameraSettings = getCameraSettings();

  return (
    <>
      <Canvas
        dpr={[1, 2]}
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          touchAction: "none",
          zIndex: -1,
        }}
        camera={{
          fov: cameraSettings.fov,
          position: cameraSettings.position,
        }}
      >
        <color attach="background" args={["#000"]} />
        <group name="Planets" ref={planetGroupRef}>
          {planets.map((planet, index) => {
            const position = calculateCarouselPosition(index);
            return (
              <Planet
                planetName={planet.name}
                key={planet.name}
                Component={planet.Component}
                initialPosition={position}
                ref={(el) => {
                  if (el) {
                    planetsRef.current[planet.name] = el;
                  }
                }}
              />
            );
          })}
        </group>
        <StarField />
      </Canvas>
      {!isThirdSection && (
        <PlanetNavigation
          handleNext={handleNext}
          handleBack={handleBack}
          isRotating={isRotating}
        />
      )}
    </>
  );
};

const planets = [
  { Component: EarthScene, name: "EARTH" },
  { Component: MoonScene, name: "MOON" },
  { Component: MarsScene, name: "MARS" },
  { Component: JupiterScene, name: "JUPITER" },
];
