import { Box, Button, Typography } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectActivePlanets } from "../Redux/Homepage/selector";
import { StarField } from "./StarField";
import { Canvas } from "@react-three/fiber";
import Loader from "./Loader";

const Overlay = forwardRef((props, ref) => {
  const activePlanet = useSelector(selectActivePlanets);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling when the Box is visible
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Hide the Box after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, [isVisible]);
  return (
    <>
      <Box
        ref={ref}
        className="first-section"
        sx={{
          color: "#fff",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          height: { xs: "100svh", md: "100vh" },
          width: "100vw",
        }}
      >
        <Box
          sx={{
            px: { xs: "16px", sm: "24px", md: "32px" },
          }}
        >
          <Box>
            <Typography
              component={"h1"}
              sx={{
                fontSize: { xs: 26, sm: 30 },
                lineHeight: 1.5,
                width: "fit-content",
                mx: "auto",
              }}
            >
              PLANET
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 54, sm: 80, lg: 110 },
                lineHeight: 1.5,
                position: "relative",
                width: "fit-content",
                mx: "auto",
                ":after": {
                  content: "''",
                  width: { xs: 80, md: 120 },
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius: "12px",
                  borderBottom: "4px solid #8FD5E7",
                },
              }}
            >
              {activePlanet.name}
            </Typography>
          </Box>
          <Typography
            sx={{
              px: { md: "8%", lg: "18%" },
              mt: 3,
              fontSize: {xs: 16, sm: 18},
              lineHeight: {xs: 1.8, sm: 2},
            }}
          >
            {headingData[activePlanet.name]}
          </Typography>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              py: "14px",
              marginTop: { xs: 6, md: 12 },
              mb: { md: 14 },
              border: 0,
              width: { xs: 160, md: 175 },
              fontWeight: 700,
              letterSpacing: 0.2,
              background: "linear-gradient(to bottom, #c6d9ef, #9fbddf)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s, box-shadow 0.3s",
              ":hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 15px rgba(100, 200, 255, 0.6)",
              },
            }}
          >
            GET STARTED
          </Button>
        </Box>
      </Box>
      {/* Loader section */}
      {isVisible && <Loader />}
    </>
  );
});

export default Overlay;

const headingData = {
  EARTH:
    "Earth is the third planet from the Sun and the only known celestial body to support life. With vast oceans, diverse ecosystems, and a stable atmosphere, Earth provides the perfect conditions for sustaining life. The planet's surface is a dynamic mix of land, water, and air, fostering a wide range of biodiversity.",
  JUPITER:
    "Jupiter is the largest planet in our Solar System, known for its massive size, thick atmosphere, and the iconic Great Red Spot, a giant storm persisting for centuries. It is a gas giant primarily composed of hydrogen and helium.",
  MARS: "Often referred to as the 'Red Planet,' Mars is the fourth planet from the Sun and is notable for its rusty red appearance due to iron oxide on its surface. It has the tallest volcano and the deepest canyon in the Solar System.",
  VENUS:
    "Venus, the second planet from the Sun, is similar in size and structure to Earth but has a thick, toxic atmosphere that traps heat, making it the hottest planet in the Solar System.",
};
