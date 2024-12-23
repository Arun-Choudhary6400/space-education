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
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { actions } from "../Redux/Homepage/slice";

gsap.registerPlugin(ScrollTrigger);

export const CanvasContainer = () => {
  const dispatch = useDispatch();
  const planetGroupRef = useRef();
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [isSecondSection, setIsSecondSection] = useState(false);
  const [isThirdSection, setIsThirdSection] = useState(false);
  const activePlanet = useSelector(selectActivePlanets);
  const planetsList = useSelector(selectPlanetsList);
  const planetsRef = useRef({});
  // Store the carousel positions
  const carouselPositions = useRef({});
  const currentIndex = useRef(0);
  const radius = 12;

  const calculateCarouselPosition = (index) => {
    const angle = (index / planets.length) * Math.PI * 2;
    return {
      x: Math.cos(angle) * radius,
      y: -1.5,
      z: Math.sin(angle) * radius,
    };
  };

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
  // const rotatePlanets = (direction) => {
  //   resetGroupPosition();

  //   setCurrentIndex((prevIndex) => {
  //     const newIndex =
  //       direction === "next"
  //         ? (prevIndex + 1) % planets.length
  //         : (prevIndex - 1 + planets.length) % planets.length;

  //     console.log("newIndex", newIndex);

  //     const tl = gsap.timeline();

  //     tl.to(planetGroupRef.current.rotation, {
  //       y: (newIndex * (Math.PI * 2)) / planets.length,
  //       duration: 1,
  //       ease: "power2.inOut",
  //       onComplete: () => {
  //         resetGroupPosition();
  //         updateCarouselPositions();
  //       },
  //     });

  //     dispatch(
  //       actions.setActivePlanet({
  //         name: planets[currentIndex].name,
  //         position: currentIndex + 1,
  //       })
  //     );

  //     return newIndex; // Return the updated index for React state
  //   });
  // };

  // const handleNext = () => rotatePlanets("next");
  // const handleBack = () => rotatePlanets("back");

  // Initialize and update carousel positions
  // useEffect(() => {
  //   updateCarouselPositions();
  // }, [currentIndex.current]);

  const INITIAL_ROTATION = -Math.PI / 2;
  useEffect(() => {
    updateCarouselPositions();
    setTimeout(() => {
      console.log("planetGroupRef.current.rotation", planetGroupRef.current);
      if (planetGroupRef.current) {
        console.log("planetGroupRef.current.rotation", planetGroupRef.current);
        planetGroupRef.current.rotation.y = INITIAL_ROTATION;
      }
    }, 1300);
  }, []);

  // const rotatePlanets = (direction) => {
  //   resetGroupPosition();
  //   let newIndex = 0;
  //   console.log("currentIndex.current", currentIndex.current);
  //   newIndex =
  //     direction === "next"
  //       ? (currentIndex.current + 1) % planets.length
  //       : (currentIndex.current - 1 + planets.length) % planets.length;

  //   console.log("newIndex", newIndex);

  //   const tl = gsap.timeline();

  //   tl.to(planetGroupRef.current.rotation, {
  //     y: INITIAL_ROTATION + newIndex * ((Math.PI * 2) / planets.length),
  //     duration: 1,
  //     ease: "power2.inOut",
  //     onComplete: () => {
  //       resetGroupPosition();
  //       updateCarouselPositions();
  //     },
  //   });

  //   // setCurrentIndex(newIndex);
  //   currentIndex.current = newIndex;
  //   const currentPlanetIndex = Number(currentIndex.current);
  //   // console.log("currentIndex.current",currentIndex.current);
  //   console.log("currentIndex", currentIndex.current);
  //   dispatch(
  //     actions.setActivePlanet({
  //       name: planets[currentPlanetIndex].name,
  //       position: currentPlanetIndex,
  //     })
  //   );
  // };

  const rotatePlanets = (direction) => {
    resetGroupPosition();
    let newIndex = 0;
    newIndex =
      direction === "next"
        ? (currentIndex.current + 1) % planets.length
        : (currentIndex.current - 1 + planets.length) % planets.length;

    const tl = gsap.timeline();

    tl.to(planetGroupRef.current.rotation, {
      y: INITIAL_ROTATION + newIndex * ((Math.PI * 2) / planets.length),
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        resetGroupPosition();
        updateCarouselPositions();
      },
    });

    currentIndex.current = newIndex;
    const currentPlanetIndex = Number(currentIndex.current);
    dispatch(
      actions.setActivePlanet({
        name: planets[currentPlanetIndex].name,
        position: currentPlanetIndex,
      })
    );
  };
  const handleNext = () => rotatePlanets("next");
  const handleBack = () => rotatePlanets("back");

  // Set up scroll trigger animations
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

  // Handle scroll-based animations
  useEffect(() => {
    if (!planetGroupRef.current) return;

    const activePlanetMesh = planetsRef.current[activePlanet.name];
    console.log("active planet name", activePlanet.name);
    if (!activePlanetMesh) return;

    const tl = gsap.timeline();
    const secondSectionPosition = {
      MOON: {
        x: 2.5,
        y: 0,
        z: 9,
      },
      JUPITER: {
        x: -2.5,
        y: 0,
        z: -9,
      },
      EARTH: {
        x: 9,
        y: 0,
        z: -2.5,
      },
      MARS: {
        x: -9,
        y: 0,
        z: 2.5,
      },
    };
    const thirdSectionPosition = {
      MOON: {
        x: 0,
        y: 0,
        z: 12.8,
      },
      JUPITER: {
        x: 0,
        y: 0,
        z: -12.8,
      },
      EARTH: {
        x: 12.8,
        y: 0,
        z: 0,
      },
      MARS: {
        x: -12.8,
        y: 0,
        z: 0,
      },
    };

    if (isSecondSection) {
      // Animate active planet to second section position
      tl.to(activePlanetMesh.position, {
        ...secondSectionPosition[activePlanet.name],
        duration: 1,
        ease: "power2.inOut",
      }).to(
        activePlanetMesh.scale,
        {
          x: 1.5,
          y: 1.5,
          z: 1.5,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=1.3"
      );

      // hide other planets
      Object.entries(planetsRef.current).forEach(([name, mesh]) => {
        if (name !== activePlanet.name) {
          gsap.to(mesh.material, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              mesh.visible = false;
            }
          });
        } else {
          mesh.visible = true;
          gsap.to(mesh.material, { opacity: 1, duration: 0.5 });
        }
      });
    } else if (isThirdSection) {
      // Animate active planet to third section position
      tl.to(activePlanetMesh.position, {
        ...thirdSectionPosition[activePlanet.name],
        duration: 1.3,
        ease: "power2.inOut",
      }).to(
        activePlanetMesh.scale,
        {
          x: 1.5,
          y: 1.5,
          z: 1.5,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=1.3"
      );
    } else {
      // Reset to carousel positions
      Object.entries(planetsRef.current).forEach(([name, mesh]) => {
        mesh.visible = true;
        const carouselPos = carouselPositions.current[name];

        tl.to(mesh.position, {
          x: carouselPos.x,
          y: carouselPos.y,
          z: carouselPos.z,
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
  }, [isSecondSection, isThirdSection, activePlanet]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowLeft") {
        handleBack();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex.current]);

  return (
    <>
      <Canvas
        dpr={[1, 2]}
        style={{ height: "100vh", width: "100vw", position: "fixed", top: 0 }}
        camera={{
          fov: 44,
          position: [0, 0, 15],
        }}
      >
        <color attach={"background"} args={["#000"]} />
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
    </>
  );
};

const planets = [
  { Component: EarthScene, name: "EARTH" },
  { Component: MoonScene, name: "MOON" },
  { Component: MarsScene, name: "MARS" },
  { Component: JupiterScene, name: "JUPITER" },
];
