import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { usePlayground } from "../services/playground";
import ConnectWeb3AuthButton from "./ConnectWeb3AuthButton";
import SourceCode from "./SourceCode";

const NotConnectedPage: React.FC = () => {
  const { isLoading } = usePlayground();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        bgcolor: "grey.100",
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: "400px",
          mt: 4,
          textAlign: "center",
          color: "grey.500",
        }}
      >
        {isLoading ? (
          <CircularProgress sx={{ color: "#0364ff" }} />
        ) : (
          <ConnectWeb3AuthButton />
        )}
      </Box>
      <SourceCode />
    </Box>
  );
};

export default NotConnectedPage;
