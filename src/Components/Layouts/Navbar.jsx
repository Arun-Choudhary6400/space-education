import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { actions } from "../../Redux/Homepage/slice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch()
  const [activeLink, setActiveLink] = useState("Planets");
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          backgroundColor: "transparent",
          height: 100,
          padding: "0px 32px 0px 24px",
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "4px solid #ffffff40",
            color: "#fff",
            height: 84,
          }}
        >
          <a
            style={{
              textDecoration: "none",
              alignContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              Space
              <Typography
                component={"span"}
                sx={{ color: "#8FD5E7", fontSize: 22, fontWeight: 700 }}
              >
                edu
              </Typography>
            </Typography>
          </a>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { md: 2.5, lg: 5 },
            }}
          >
            {/* <Button
            sx={{
              pointerEvents: "auto"
            }}
              onClick={() => {
                dispatch(
                  actions.setActivePlanet({
                    name: "MARS",
                    position: 4,
                  })
                );
              }}
            >
              Next
            </Button> */}
            <Typography
              onClick={() => setActiveLink("Planets")}
              sx={[
                navlinkStyle,
                activeLink == "Planets" ? activeLinkStyle : "",
              ]}
            >
              Planets
            </Typography>
            <Typography
              onClick={() => setActiveLink("Trailers")}
              sx={[
                navlinkStyle,
                activeLink == "Trailers" ? activeLinkStyle : "",
              ]}
            >
              Trailers
            </Typography>
            <Typography
              onClick={() => setActiveLink("Tickets")}
              sx={[
                navlinkStyle,
                activeLink == "Tickets" ? activeLinkStyle : "",
              ]}
            >
              Tickets
            </Typography>
            <Typography
              onClick={() => setActiveLink("Blogs")}
              sx={[navlinkStyle, activeLink == "Blogs" ? activeLinkStyle : ""]}
            >
              Blogs
            </Typography>
            <Button
              sx={{
                borderRadius: "50px",
                backgroundColor: "#fff",
                color: "#000",
                padding: "8px 16px",
                width: 130,
                height: "fit-content",
                border: 0,
                pointerEvents: "auto",
                fontWeight: 700,
                letterSpacing: 0.2,
              }}
            >
              Enroll
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
const navlinkStyle = {
  pointerEvents: "auto",
  padding: "0px 12px",
  position: "relative",
  cursor: "pointer",
  fontSize: 18,
  my: 3,
};
const activeLinkStyle = {
  ":after": {
    content: "''",
    width: "100%",
    position: "absolute",
    bottom: "-28px",
    left: 0,
    borderRadius: "12px",
    borderBottom: "4px solid #8FD5E7",
  },
};
