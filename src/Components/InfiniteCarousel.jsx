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
                }}
              >
                THE BLUE PLANET
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 60, sm: 80, lg: 110 },
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
                  pt: { xs: 8, lg: 13 },
                  fontSize: 18,
                  lineHeight: 2,
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias quis reprehenderit vero ab! A earum nulla porro,
                numquam dignissimos architecto ipsa iure. Totam, rem. Magni
                illum in natus ullam, ab necessitatibus labore unde
              </Typography>
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
                      boxShadow: "0 6px 15px rgba(100, 200, 255, 0.6)"
                    }
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
                      boxShadow: "0 6px 15px rgba(100, 200, 255, 0.6)"
                    }
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
