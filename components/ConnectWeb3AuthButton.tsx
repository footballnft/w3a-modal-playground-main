// ConnectWeb3AuthButton.tsx

import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React from "react";
import Image from "next/image";
import { Button, Box } from "@mui/material";

import Web3AuthLogoWhite from "../assets/web3authLogoWhite.svg";

const ConnectWeb3AuthButton: React.FC = () => {
  const { isConnected, connect } = useWeb3Auth();

  if (isConnected) {
    return null;
  }

  return (
    <Button
      variant="contained"
      onClick={connect}
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
      Connect to Web3Auth
    </Button>
  );
};

export default ConnectWeb3AuthButton;
