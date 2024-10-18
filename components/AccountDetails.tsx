import { CustomChainConfig, WALLET_ADAPTERS } from "@web3auth/base";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React, { JSX, useEffect, useState } from "react";
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { usePlayground } from "../services/playground";
import { Avatar, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";

interface AccountDetailsProps {
  children?: JSX.Element | JSX.Element[];
}

const Dropdown = dynamic(() => import('../components/DropDown'));

function AccountDetails({ children }: AccountDetailsProps) {
  const {
    address,
    balance,
    getUserInfo,
    updateConnectedChain,
    connectedChain,
    isLoading,
    chainList,
    switchChain,
    getChainId,
    chainListOptionSelected,
  } = usePlayground();
  const { userInfo, web3Auth, isConnected } = useWeb3Auth();
  const [addressToShow, setAddressToShow] = useState<string>(address || "");
  const [selectedChain, setSelectedChain] = useState<string>(Object.keys(chainList)[0]);
  const [chainDetails, setChainDetails] = useState<CustomChainConfig>(chainList[selectedChain]);

  useEffect(() => {
    setAddressToShow(address || "");
    setChainDetails(chainList[selectedChain]);
  }, [selectedChain, address]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(chainDetails);
  };

  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 6, lg: 8 }, width: "100%", zIndex: 0 }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">Your Account Details</Typography>
        <Dropdown
          rounded
          options={[...Object.keys(chainList)]}
          selectedOption={chainListOptionSelected}
          displayOptions={Object.keys(chainList).map((k) => chainList[k].displayName)
            .filter((displayName): displayName is string => !!displayName)} // Filter out undefined
          onChange={async (option) => {
            if ((await getChainId()) !== chainList[option].chainId) {
              await switchChain(chainList[option]);
            }
            updateConnectedChain(option);
            setSelectedChain(option);
          }}
        />
      </Box>
      <Box sx={{ p: 3, mt: 3, backgroundColor: "white", borderRadius: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center" }}>
          {userInfo?.profileImage && (
            <Image
              src={userInfo.profileImage}
              alt="User Profile"
              width={96}
              height={96}
              style={{ borderRadius: "8px" }}
            />
          )}
          {!userInfo?.profileImage && userInfo?.name && (
            <Avatar sx={{ width: 96, height: 96, backgroundColor: "purple" }}>
              {userInfo.name.charAt(0).toUpperCase()}
            </Avatar>
          )}
          {!(userInfo?.profileImage || userInfo?.name) && (
            <Avatar sx={{ width: 96, height: 96, backgroundColor: "purple" }}>
              {web3Auth && web3Auth.connectedAdapterName ? web3Auth.connectedAdapterName.charAt(0).toUpperCase() : ""}
            </Avatar>
          )}
          <Box sx={{ pl: { md: 3 }, flex: 1, mt: { xs: 2, md: 0 } }}>
            <Typography variant="h5" fontWeight="bold">
              {isConnected && web3Auth && web3Auth.connectedAdapterName === WALLET_ADAPTERS.AUTH
                ? userInfo?.name
                : `Connected to ${web3Auth && web3Auth.connectedAdapterName}`}
            </Typography>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(address);
                setAddressToShow("Copied!");
                setTimeout(() => {
                  setAddressToShow(address);
                }, 1000);
              }}
              sx={{
                mt: 1,
                textTransform: "none",
                backgroundColor: "gray.100",
                color: "gray.600",
                fontSize: "0.875rem",
                borderRadius: "9999px",
                p: "4px 8px",
              }}
            >
              {addressToShow}
            </Button>
          </Box>
        </Box>
        {isConnected && web3Auth && web3Auth.connectedAdapterName === WALLET_ADAPTERS.AUTH && (
          <Button variant="outlined" onClick={getUserInfo} sx={{ mt: 2, width: "100%" }}>
            View User Info in Console
          </Button>
        )}
      </Box>
      <Box sx={{ p: 3, mt: 3, backgroundColor: "white", borderRadius: 1, display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="subtitle2">Wallet Balance</Typography>
          <Typography variant="h5">{balance} {connectedChain?.ticker}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Chain ID</Typography>
          <Typography variant="h5">{connectedChain?.chainId}</Typography>
        </Box>
      </Box>
      <Box sx={{ p: 3, mt: 3, backgroundColor: "white", borderRadius: 1 }}>
        <Typography variant="h6" fontWeight="bold">Use Custom Chain Config</Typography>
        <form onSubmit={handleSubmit}>
          {Object.entries(chainDetails).map(
            ([field, value], index) =>
              field !== "chainNamespace" && (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ minWidth: 120 }}>{field.replace(/([A-Z])/g, " $1")}</Typography>
                  <TextField
                    id={field}
                    value={value || ""}
                    onChange={(e) => setChainDetails({ ...chainDetails, [field]: e.target.value })}
                    fullWidth
                  />
                </Box>
              )
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, width: "100%", display: "flex", alignItems: "center" }}
            disabled={isLoading}
            onClick={() => switchChain(chainDetails)}
          >
            {isLoading ? <CircularProgress size={20} /> : "Change Network Config"}
          </Button>
        </form>
      </Box>
      {children}
    </Box>
  );
}

export default AccountDetails;
