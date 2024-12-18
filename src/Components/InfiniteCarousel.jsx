import React, { forwardRef, useEffect, useRef, useState } from "react";
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
          height: "100vh",
          width: "100vw",
          zIndex: 12,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            padding: "0px 140px",
          }}
        >
          <Grid container>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                component={"h1"}
                sx={{
                  fontSize: 30,
                  lineHeight: 1.5,
                  width: "fit-content",
                }}
              >
                THE BLUE PLANET
              </Typography>
              <Typography
                sx={{
                  fontSize: 110,
                  lineHeight: 1.5,
                  position: "relative",
                  width: "fit-content",
                  ":after": {
                    content: "''",
                    width: 120,
                    position: "absolute",
                    bottom: -40,
                    left: 0,
                    // transform: "translateX(-50%)",
                    borderRadius: "12px",
                    borderBottom: "4px solid #8FD5E7",
                  },
                }}
              >
                {activePlanet.name}
              </Typography>
              <Typography
                sx={{
                  pt: 10,
                  mt: 3,
                  fontSize: 18,
                  lineHeight: 2,
                  // color: "#fff"
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias quis reprehenderit vero ab! A earum nulla porro,
                numquam dignissimos architecto ipsa iure. Totam, rem. Magni
                illum in natus ullam, ab necessitatibus labore unde
              </Typography>
              <Box
                sx={{
                  marginTop: 12,
                  display: "flex",
                  gap: 2,
                }}
              >
                <Button
                  sx={{
                    borderRadius: "50px",
                    backgroundColor: "#fff",
                    color: "#000",
                    padding: "14px 38px",
                    border: 0,
                    fontWeight: 700,
                    letterSpacing: 0.2,
                  }}
                >
                  Learn More
                </Button>
                <Button
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    minWidth: "auto",
                    flexShrink: 0,
                    padding: "6px 16px",
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

const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
