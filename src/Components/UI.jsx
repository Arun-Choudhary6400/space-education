import { Scroll } from "@react-three/drei";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../Redux/Homepage/slice";
import {
  selectActivePlanets,
  selectPlanetsList,
} from "../Redux/Homepage/selector";
import { Box, Button, Typography } from "@mui/material";

export const UI = () => {
  const activePlanet = useSelector(selectActivePlanets);
  const PlanetsLength = 4;
  const dispatch = useDispatch();
  return (
    <>
      {/* <Scroll html> */}
        {/* <div>
          <h1
            onClick={() => {
              if (activePlanet == 1) {
                dispatch(actions.setActivePlanet(PlanetsLength));
              } else {
                dispatch(actions.setActivePlanet(activePlanet - 1));
              }
            }}
            style={{
              color: "#fff",
            }}
          >
            Back
          </h1>
          <h1
            onClick={() => {
              if (activePlanet == PlanetsLength) {
                dispatch(actions.setActivePlanet(1));
              } else {
                dispatch(actions.setActivePlanet(activePlanet + 1));
              }
            }}
            style={{
              color: "#fff",
            }}
          >
            Next {activePlanet}
          </h1>
        </div> */}
        <Box
          sx={{
            // width: "100vw",
            padding: "240px 0px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            position: "fixed",
            inset: 0,
            top: "180px"
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
                  mx: "auto"
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
                lineHeight: 2
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              quis reprehenderit vero ab! A earum nulla porro, numquam
              dignissimos architecto ipsa iure. Totam, rem. Magni illum in natus
              ullam, ab necessitatibus labore unde
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
                letterSpacing: 0.2
              }}
            >
              GET STARTED
            </Button>
          </Box>
        </Box>
      {/* </Scroll> */}
    </>
  );
};
