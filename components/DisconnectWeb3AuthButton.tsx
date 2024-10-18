import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React from "react";
import { Button, Box } from "@mui/material";
import Web3AuthLogoWhite from "../assets/web3authLogoWhite.svg";

const DisconnectWeb3AuthButton: React.FC = () => {
  const { isConnected, logout } = useWeb3Auth();

  const handleLogout = async () => {
    await logout();
  };

  if (isConnected) {
    return (
      <Button
        variant="contained"
        onClick={handleLogout}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
          py: 1.5,
          backgroundColor: "#0364ff",
          color: "#fff",
          borderRadius: "100px",
          '&:hover': {
            backgroundColor: "#0354d4",
          }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", marginRight: 1 }}>
          <Web3AuthLogoWhite width={24} height={24} />
        </Box>
        Disconnect
      </Button>
    );
  }
  return null;
};

export default DisconnectWeb3AuthButton;
