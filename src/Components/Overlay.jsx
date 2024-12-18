import { Box, Button, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectActivePlanets } from "../Redux/Homepage/selector";

const Overlay = forwardRef((props, ref) => {
  const activePlanet = useSelector(selectActivePlanets);
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
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            padding: "0px 32px",
          }}
        >
          <Box>
            <Typography
              component={"h1"}
              sx={{
                fontSize: 30,
                lineHeight: 1.5,
                width: "fit-content",
                mx: "auto",
              }}
            >
              PLANET
            </Typography>
            <Typography
              sx={{
                fontSize: 110,
                lineHeight: 1.5,
                position: "relative",
                width: "fit-content",
                mx: "auto",
                ":after": {
                  content: "''",
                  width: 120,
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
              padding: "0px 18%",
              mt: 3,
              fontSize: 18,
              lineHeight: 2,
              // color: "#fff"
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            quis reprehenderit vero ab! A earum nulla porro, numquam dignissimos
            architecto ipsa iure. Totam, rem. Magni illum in natus ullam, ab
            necessitatibus labore unde
          </Typography>
          <Button
            sx={{
              borderRadius: "50px",
              backgroundColor: "#fff",
              color: "#000",
              padding: "14px 38px",
              marginTop: 12,
              border: 0,
              fontWeight: 700,
              letterSpacing: 0.2,
            }}
          >
            GET STARTED
          </Button>
        </Box>
      </Box>
    </>
  );
});

export default Overlay;
