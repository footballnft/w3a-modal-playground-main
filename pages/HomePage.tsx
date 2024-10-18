import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React from "react";
import AccountDetails from "../components/AccountDetails";
import Console from "../components/Console";
import Header from "../components/Header";
import NotConnectedPage from "../components/NotConnectedPage";
import Sidebar from "../components/Sidebar";
import SourceCode from "../components/SourceCode";
import { Container, Box, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  const { isConnected } = useWeb3Auth();

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', height: '100vh', zIndex: 0 }}>
      <Header />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {isConnected ? (
          <>
            <Sidebar />
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', bg: 'grey.50', alignItems: 'center', justifyContent: 'flex-start', overflow: 'auto' }}>
              <Typography variant="h4" component="h1" sx={{ width: '90%', px: { xs: 4, sm: 6, lg: 8 }, pt: 16, textAlign: 'center', fontWeight: 'bold' }}>
                Welcome to Web3Auth PnP Modal SDK Playground
              </Typography>
              <AccountDetails />
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

export default HomePage;
