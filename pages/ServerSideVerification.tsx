import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React, { useState } from "react";
import Console from "../components/Console";
import Form from "../components/Form";
import Header from "../components/Header";
import NotConnectedPage from "../components/NotConnectedPage";
import Sidebar from "../components/Sidebar";
import SourceCode from "../components/SourceCode";
import { usePlayground } from "../services/playground";
import { Container, Box, Typography, Button, CircularProgress } from '@mui/material';

const ServerSideVerification: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { isConnected } = useWeb3Auth();
  const [tokenId, setTokenId] = useState<string | null>(null);
  const { verifyServerSide, getIdToken } = usePlayground();

  const handleVerify = async () => {
    setLoading(true);
    await verifyServerSide(tokenId!); // Assuming tokenId is never null here
    setLoading(false);
  };

  const handleGetToken = async () => {
    setLoading(true);
    const idtoken = await getIdToken();
    setTokenId(idtoken);
    setLoading(false);
  };

  const formDetails = [
    {
      label: "JWT IdToken received from Web3Auth",
      input: tokenId || "", // Ensure input is always a string
      readOnly: true,
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', zIndex: 0 }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {isConnected ? (
          <>
            <Sidebar />
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', bg: 'grey.50', alignItems: 'center', justifyContent: 'flex-start', overflow: 'auto' }}>
              <Typography variant="h4" component="h1" sx={{ width: '90%', px: { xs: 4, sm: 6, lg: 8 }, pt: 16, pb: 8, textAlign: 'center', fontWeight: 'bold' }}>
                Server Side Verification
              </Typography>
              <Form heading="" formDetails={formDetails}>
                {tokenId ? (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleVerify}
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                  >
                    Verify
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleGetToken}
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                  >
                    Get ID Token
                  </Button>
                )}
              </Form>
              <Console />
              <SourceCode />
            </Box>
          </>
        ) : (
          <NotConnectedPage />
        )}
      </Box>
    </Container>
  );
};

export default ServerSideVerification;
