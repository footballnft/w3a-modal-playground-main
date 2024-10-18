import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React, { useState } from "react";
import { Button, CircularProgress, TextField, Grid, Typography, Tabs, Tab, Box } from "@mui/material";
import Console from "../components/Console";
import Form from "../components/Form";
import Header from "../components/Header";
import NotConnectedPage from "../components/NotConnectedPage";
import Sidebar from "../components/Sidebar";
import SourceCode from "../components/SourceCode";
import ABI from "../config/ABI.json";
import { usePlayground } from "../services/playground";

function Contract() {
  const [abi, setAbi] = useState<string>(JSON.stringify(ABI));
  const [bytecode, setBytecode] = useState<string>(
    "60806040523480156200001157600080fd5b5060405162000bee38038062000bee8339818101604052810190620000379190620001e3565b..."
  );
  const [contractValue, setContractValue] = useState<string>("Welcome to Web3Auth");
  const [address, setAddress] = useState("0x28Fd42Ce70427811dE533537B04eF1a137948a81");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("deploy");

  const { deployContract, readContract, writeContract } = usePlayground();
  const { isConnected } = useWeb3Auth();

  const formDetailsDeploy = [
    {
      label: "Contract ABI",
      input: abi,
      onChange: setAbi,
    },
    {
      label: "Contract Bytecode",
      input: bytecode,
      onChange: setBytecode,
    },
    {
      label: "Initial Value to Set",
      input: contractValue,
      onChange: setContractValue,
    },
  ];

  const formDetailsRead = [
    {
      label: "Contract ABI",
      input: abi,
      onChange: setAbi,
    },
    {
      label: "Contract Address",
      input: address,
      onChange: setAddress,
    },
  ];

  const LoaderButton = ({ children, ...props }: any) => (
    <Button {...props} variant="contained" disabled={loading} fullWidth>
      {loading && <CircularProgress size={24} sx={{ color: "white", marginRight: 2 }} />}
      {children}
    </Button>
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  if (!isConnected) {
    return <NotConnectedPage />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={10}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="Deploy Contract" value="deploy" />
            <Tab label="Read Contract" value="read" />
            <Tab label="Write Contract" value="write" />
          </Tabs>
        </Box>

        <Box sx={{ padding: 2 }}>
          {tab === "deploy" && (
            <Form
              formDetails={formDetailsDeploy}
              handleSubmit={deployContract}
              loading={loading}
              LoaderButton={LoaderButton}
            />
          )}
          {tab === "read" && (
            <Form
              formDetails={formDetailsRead}
              handleSubmit={readContract}
              loading={loading}
              LoaderButton={LoaderButton}
            />
          )}
          {/* Add write contract form if needed */}
        </Box>

        <Console />
        <SourceCode />
      </Grid>
    </Grid>
  );
}

export default Contract;
