import { ArrowUpward } from "@mui/icons-material";
import { Box, Button, Grid2 as Grid, Tooltip, Typography } from "@mui/material";
import gsap from "gsap";
import React, { forwardRef, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSelector } from "react-redux";
import { selectActivePlanets } from "../Redux/Homepage/selector";

gsap.registerPlugin(ScrollTrigger);

const MoreInfo = forwardRef((props, ref) => {
  const activePlanet = useSelector(selectActivePlanets);
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
                fontSize: { xs: 16, sm: 18 },
                lineHeight: { xs: 1.8, sm: 2 },
                textAlign: "end",
                opacity: 0,
              }}
              dangerouslySetInnerHTML={{
                __html: moreInfoData[activePlanet.name]
                  ?.split("\n")
                  ?.join("<br />"),
              }}
            />
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

const moreInfoData = {
  EARTH: `Earth’s atmosphere protects life by filtering harmful solar radiation and providing essential gases for survival. It also plays a crucial role in regulating temperature, ensuring a stable climate for biodiversity to thrive.`,
  JUPITER: `Jupiter is the largest planet in our Solar System, with a mass 318 times that of Earth. Its swirling atmosphere is made of hydrogen and helium, and it is home to the Great Red Spot, a storm that has raged for over 300 years.`,
  MARS: `Mars, the fourth planet from the Sun, is known for its rusty red appearance due to iron oxide (rust) on its surface. It has the tallest volcano in the Solar System, Olympus Mons, and the deepest canyon, Valles Marineris. Scientists believe Mars once had liquid water, making it a key target for future human exploration.`,
  VENUS: `Venus is often called Earth's twin because of its similar size and composition, but it has a toxic, thick atmosphere that traps heat, making it the hottest planet in our Solar System. Surface temperatures reach 475°C (900°F)—hot enough to melt lead!`,
};
