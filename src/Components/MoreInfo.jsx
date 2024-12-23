import { ArrowUpward } from "@mui/icons-material";
import { Box, Button, Grid2 as Grid, Tooltip, Typography } from "@mui/material";
import gsap from "gsap";
import React, { forwardRef, useEffect } from "react";

const MoreInfo = forwardRef((props, ref) => {
  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: {
        y: 0,
      },
      duration: 2.3,
    });
  };

  return (
    <>
      <Box
        ref={ref}
        className="third-section section"
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          alignItems: "end",
          zIndex: 12,
        }}
      >
        <Grid
          container
          sx={{
            px: "140px",
          }}
        >
          <Grid size={{ xs: 12, md: 6 }} />
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: "relative",
                ":after": {
                  content: "''",
                  width: 120,
                  position: "absolute",
                  bottom: 25,
                  right: 0,
                  // transform: "translateX(-50%)",
                  borderRadius: "12px",
                  borderBottom: "4px solid #8FD5E7",
                },
              }}
            />
            <Typography
              sx={{
                pb: 8,
                mt: 3,
                fontSize: 18,
                lineHeight: 2,
                textAlign: "end",
                // color: "#fff"
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
              quis reprehenderit vero ab! A earum nulla porro, numquam
              dignissimos architecto ipsa iure. Totam, rem. Magni illum in natus
              ullam, ab necessitatibus labore unde
            </Typography>
            <Box sx={{ position: "relative" }}>
              <Tooltip title="Back To Top" placement="top">
                <Button
                  disableRipple
                  onClick={scrollToTop}
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    p: 1.5,
                    minWidth: "auto",
                    position: "absolute",
                    bottom: 73,
                    right: -60,
                  }}
                >
                  <ArrowUpward
                    sx={{
                      color: "#000",
                      fontSize: 22,
                    }}
                  />
                </Button>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
});

export default MoreInfo;
