import React, { forwardRef } from "react";
import "./Carousel.css";
import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import { selectActivePlanets } from "../Redux/Homepage/selector";
import { useSelector } from "react-redux";
import { PlayArrowRounded } from "@mui/icons-material";

const InfiniteCarousel = forwardRef((props, ref) => {
  const activePlanet = useSelector(selectActivePlanets);

  return (
    <>
      <Box
        ref={ref}
        className="second-section section"
        sx={{
          height: { xs: "100svh", md: "100vh" },
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            px: { xs: "16px", sm: "24px", md: "32px", xl: "140px" },
          }}
        >
          <Grid container>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                component={"h1"}
                sx={{
                  fontSize: { xs: 26, sm: 30 },
                  lineHeight: 1.5,
                  width: "fit-content",
                  textTransform: "uppercase",
                }}
              >
                THE{" "}
                {activePlanet.name == "EARTH"
                  ? "Blue"
                  : activePlanet.name == "MARS"
                  ? "Red"
                  : activePlanet.name == "JUPITER"
                  ? "Giant"
                  : activePlanet.name == "VENUS"
                  ? "Sister"
                  : ""}{" "}
                PLANET
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 54, sm: 80, lg: 110 },
                  lineHeight: 1.5,
                  position: "relative",
                  width: "fit-content",
                  ":after": {
                    content: "''",
                    width: 120,
                    position: "absolute",
                    bottom: { xs: -20, lg: -40 },
                    left: 0,
                    borderRadius: "12px",
                    borderBottom: "4px solid #8FD5E7",
                  },
                }}
              >
                {activePlanet.name}
              </Typography>
              <Typography
                sx={{
                  pt: { xs: 6, sm: 8, lg: 13 },
                  fontSize: {xs: 16, sm: 18},
                  lineHeight: {xs: 1.8, sm: 2},
                }}
                dangerouslySetInnerHTML={{
                  __html: infoData[activePlanet.name]
                    ?.split("\n")
                    ?.join("<br />"),
                }}
              />
              <Box
                sx={{
                  marginTop: { xs: 6, lg: 12 },
                  display: "flex",
                  gap: 2,
                }}
              >
                <Button
                  sx={{
                    borderRadius: "50px",
                    backgroundColor: "#fff",
                    color: "#000",
                    py: "14px",
                    border: 0,
                    width: { xs: 150, md: 172 },
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
                  Learn More
                </Button>
                <Button
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    minWidth: "auto",
                    padding: "6px 16px",
                    background: "linear-gradient(to bottom, #c6d9ef, #9fbddf)",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    ":hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 15px rgba(100, 200, 255, 0.6)",
                    },
                  }}
                >
                  <PlayArrowRounded
                    sx={{
                      color: "#000",
                    }}
                  />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
});

export default InfiniteCarousel;

const infoData = {
  EARTH: `Earth, our home, is the third planet from the Sun and the only known celestial body to support life. With vast oceans, lush forests, and a diverse range of ecosystems, it is often called "The Blue Planet" due to the abundance of water covering about 71% of its surface.
🔹 Diameter: 12,742 km
🔹 Distance from Sun: 149.6 million km
🔹 Atmosphere: Nitrogen (78%), Oxygen (21%), Argon, CO₂
🔹 Moons: 1 (The Moon)
  `,
  JUPITER: `Jupiter is the largest planet in our Solar System, with a mass 318 times that of Earth. Its swirling atmosphere is made of hydrogen and helium, and it is home to the Great Red Spot, a storm that has raged for over 300 years.

🔹 Diameter: 139,820 km
🔹 Distance from Sun: 778.5 million km
🔹 Atmosphere: Hydrogen, Helium, Methane, Ammonia
🔹 Moons: 95+ (including Ganymede, Europa, Io, Callisto)`,
  MARS: `Mars, the fourth planet from the Sun, is known for its rusty red appearance due to iron oxide (rust) on its surface. It has the tallest volcano in the Solar System, Olympus Mons, and the deepest canyon, Valles Marineris. Scientists believe Mars once had liquid water, making it a key target for future human exploration.

🔹 Diameter: 6,779 km
🔹 Distance from Sun: 227.9 million km
🔹 Atmosphere: Carbon dioxide (95%), Nitrogen, Argon
🔹 Moons: 2 (Phobos, Deimos)`,
  VENUS: `Venus is often called Earth's twin because of its similar size and composition, but it has a toxic, thick atmosphere that traps heat, making it the hottest planet in our Solar System. Surface temperatures reach 475°C (900°F)—hot enough to melt lead!

🔹 Diameter: 12,104 km
🔹 Distance from Sun: 108.2 million km
🔹 Atmosphere: Carbon dioxide (96%), Nitrogen, Sulfuric Acid Clouds
🔹 Moons: None`
};
