import { Menu } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  Skeleton,
  styled,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const drawerWidth = 240;

const Navbar = (props) => {
  const [activeLink, setActiveLink] = useState("Planets");
  const { window } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    if (newOpen == false) {
      // if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
      // }
    } else {
      document.body.style.overflow = "unset";
    }
  };
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          backgroundColor: "transparent",
          height: 90,
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
              display: { xs: "block", md: "none" },
              alignContent: "center",
            }}
          >
            <Button
              disableRipple
              sx={{
                pointerEvents: "auto",
              }}
              onClick={toggleDrawer(true)}
            >
              <Menu
                sx={{
                  color: "#fff",
                }}
              />
            </Button>
            <Drawer
              open={open}
              onClose={toggleDrawer(false)}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              variant="temporary"
              anchor="right"
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  height: "100vh",
                  overflow: "hidden",
                  backgroundColor: "transparent",
                },
              }}
            >
              <Box
                sx={{
                  width: drawerWidth,
                  height: "100vh",
                  backgroundColor: "transparent",
                  background: "linear-gradient(#0000ff50 55%, white)",
                  backdropFilter: "blur(4px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  px: 3,
                  pt: 6
                }}
              >
                {navLinks?.map((item) => (
                  <Typography
                    onClick={() => setActiveLink(item)}
                    sx={[
                      { color: "#fff", fontSize: 18 },
                      activeLink == item ? activeLinkStyle : "",
                    ]}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Drawer>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: { md: 2.5, lg: 5 },
            }}
          >
            {navLinks?.map((item) => (
              <Typography
                onClick={() => setActiveLink(item)}
                sx={[navlinkStyle, activeLink == item ? activeLinkStyle : ""]}
              >
                {item}
              </Typography>
            ))}
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
const navLinks = ["Planets", "Trailers", "Tickets", "Blogs"];
