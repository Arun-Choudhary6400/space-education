import { ArrowUpward } from "@mui/icons-material";
import { Box, Button, Grid2 as Grid, Tooltip, Typography } from "@mui/material";
import gsap from "gsap";
import React, { forwardRef, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MoreInfo = forwardRef((props, ref) => {
  const contentRef = useRef();
  const lineRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 30%",
        end: "bottom 30%",
      },
    });

    tl.to(".moreinfoText", {
      opacity: 1,
      duration: 1,
      delay: 1,
      ease: "power2.out",
    })
      .to(lineRef.current, {
        width: "100%",
        duration: 0.6,
        ease: "power2.out",
        delay: 1,
      })
      .to(buttonRef.current, {
        opacity: 1,
        duration: 0.4,
        delay: 1,
        ease: "power2.out",
      });
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 2.3,
    });
  };

  return (
    <Box
      ref={ref}
      className="third-section section"
      sx={{
        height: { xs: "100svh", md: "100vh" },
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "end",
      }}
    >
      <Box sx={{ px: { xs: "16px", sm: "24px", md: "32px", xl: "140px" } }}>
        <Grid container>
          <Grid size={{ xs: 12, md: 2, lg: 6 }} />
          <Grid size={{ xs: 12, md: 10, lg: 6 }}>
            <Box
              ref={lineRef}
              sx={{
                position: "relative",
                ":after": {
                  content: "''",
                  width: 120,
                  position: "absolute",
                  bottom: 25,
                  right: 0,
                  borderRadius: "12px",
                  borderBottom: "4px solid #8FD5E7",
                },
              }}
            />
            <Typography
              ref={contentRef}
              className="moreinfoText"
              sx={{
                pb: 12,
                mt: 3,
                fontSize: 18,
                lineHeight: 2,
                textAlign: "end",
                opacity: 0,
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
                  ref={buttonRef}
                  disableRipple
                  onClick={scrollToTop}
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    p: 1.5,
                    minWidth: "auto",
                    position: "absolute",
                    bottom: 40,
                    right: 0,
                    opacity: 0,
                  }}
                >
                  <ArrowUpward sx={{ color: "#000", fontSize: 22 }} />
                </Button>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});

export default MoreInfo;
