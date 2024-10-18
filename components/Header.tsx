import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Drawer } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import Web3AuthLogo from "../assets/web3authLogoBlue.svg";
import DisconnectWeb3AuthButton from "./DisconnectWeb3AuthButton";
import React from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

const Header = () => {
  const { isConnected } = useWeb3Auth();
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToHome = () => {
    router.push("/");
  };

  return (
    <AppBar position="sticky" sx={{ zIndex: 10 }}>
      <Toolbar sx={{ justifyContent: "space-between", borderBottom: 1, borderColor: 'divider' }}>
        <Box display="flex" alignItems="center" onClick={goToHome} sx={{ cursor: 'pointer' }}>
        <Web3AuthLogo width={30} height={30} />
          <Typography variant="h6" sx={{ borderLeft: 1, pl: 2, ml: 2 }}>
            SDK Playground
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              ml: 2,
              px: 2,
              py: 0.5,
              backgroundColor: "purple.100",
              borderRadius: 1,
              whiteSpace: "nowrap",
            }}
          >
            <Typography variant="caption" color="purple.800">
              {windowDimensions.width > 425 ? "Plug and Play Modal" : "PnP Modal"}
            </Typography>
          </Box>
        </Box>

        {/* Desktop View: Show Disconnect Button */}
        {isConnected && (
          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            <DisconnectWeb3AuthButton />
          </Box>
        )}

        {/* Mobile View: Show Hamburger Menu */}
        {isConnected && (
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => setOpen(!isOpen)}
            sx={{ display: { xs: "flex", lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={isOpen} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, p: 2 }} role="presentation" onClick={() => setOpen(false)}>
          <DisconnectWeb3AuthButton />
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
