import React from "react";
import { Box, IconButton } from "@mui/material";
import {
  ArrowCircleLeftRounded,
  ArrowCircleRightRounded,
} from "@mui/icons-material";

const PlanetNavigation = ({ handleNext, handleBack, isRotating }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "1rem",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "end",
        px: 4,
        height: 62,
        zIndex: "20 !important",
      }}
    >
      <IconButton onClick={handleBack} disabled={isRotating}>
        <ArrowCircleLeftRounded
          sx={{
            color: "#ffffff50",
            ":hover": {
              color: "#fff",
            },
            fontSize: "2.5rem",
            pointerEvents: "auto",
          }}
        />
      </IconButton>

      <IconButton onClick={handleNext} disabled={isRotating}>
        <ArrowCircleRightRounded
          sx={{
            color: "#ffffff50",
            ":hover": {
              color: "#fff",
            },
            fontSize: "2.5rem",
            pointerEvents: "auto",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default PlanetNavigation;
