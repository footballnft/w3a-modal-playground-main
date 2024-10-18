import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React, { useState } from "react";
import Console from "../components/Console";
import Form from "../components/Form";
import Header from "../components/Header";
import NotConnectedPage from "../components/NotConnectedPage";
import Sidebar from "../components/Sidebar";
import SourceCode from "../components/SourceCode";
import Tabs from "../components/Tabs";
import { usePlayground } from "../services/playground";
import { Container, Box, Typography, Button, CircularProgress, Tabs as MuiTabs, Tab } from '@mui/material';

const Transaction: React.FC = () => {
  const { getSignature, sendTransaction } = usePlayground();
  const { isConnected } = useWeb3Auth();
  const [message, setMessage] = useState("Welcome to Web3Auth");
  const [address, setAddress] = useState("0xeaA8Af602b2eDE45922818AE5f9f7FdE50cFa1A8");
  const [amount, setAmount] = useState("0.01");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("signMessage");

  const formDetailsSignMessage = [
    { label: "message", input: message, onChange: setMessage },
  ];

  const formDetailsDestinationAddress = [
    { label: "destination address", input: address, onChange: setAddress },
    { label: "amount", input: amount, onChange: setAmount },
  ];

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', zIndex: 0 }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        {isConnected ? (
          <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', bg: 'grey.50', alignItems: 'center', justifyContent: 'flex-start', overflow: 'auto' }}>
            <Typography variant="h4" component="h1" sx={{ width: '90%', px: { xs: 4, sm: 6, lg: 8 }, pt: 16, pb: 8, textAlign: 'center', fontWeight: 'bold' }}>
              Signing/ Transaction
            </Typography>
            <MuiTabs value={tab} onChange={handleTabChange} aria-label="transaction tabs">
              <Tab label="Sign Message" value="signMessage" />
              <Tab label="Send Transaction" value="sendTransaction" />
            </MuiTabs>
            {tab === "signMessage" ? (
              <Form formDetails={formDetailsSignMessage}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={async () => {
                    setLoading(true);
                    await getSignature(message);
                    setLoading(false);
                  }}
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  Sign Message
                </Button>
              </Form>
            ) : (
              <Form formDetails={formDetailsDestinationAddress}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={async () => {
                    setLoading(true);
                    await sendTransaction(amount, address);
                    setLoading(false);
                  }}
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  Send Transaction
                </Button>
              </Form>
            )}
            <Console />
            <SourceCode />
          </Box>
        ) : (
          <NotConnectedPage />
        )}
      </Box>
    </Container>
  );
};

export default Transaction;
