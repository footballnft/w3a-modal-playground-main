import React from "react";
import { Box, Typography, Link } from "@mui/material";

const SourceCode: React.FC = () => {
  return (
    <Box
      sx={{
        px: 2,
        position: "absolute",
        bottom: 0,
        width: "100%",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="textSecondary" sx={{ py: 2, textTransform: "uppercase", fontWeight: "medium" }}>
        <Link href="https://github.com/Web3Auth/web3auth-pnp-examples/tree/main/web-modal-sdk/react-modal-playground" target="_blank" underline="hover">
          Source code
        </Link>
      </Typography>
      <Link
        href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FWeb3Auth%2Fweb3auth-pnp-examples%2Ftree%2Fmain%2Fweb-modal-sdk%2Freact-modal-playground&project-name=w3a-modal-playground&repository-name=w3a-modal-playground"
        target="_blank"
      >
        <img src="https://vercel.com/button" alt="Deploy with Vercel" style={{ marginTop: 8 }} />
      </Link>
    </Box>
  );
};

export default SourceCode;
