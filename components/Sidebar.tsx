import { WALLET_ADAPTERS } from "@web3auth/base";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { useWalletServicesPlugin } from "@web3auth/wallet-services-plugin-react-hooks";
import React from "react";
import { useRouter } from "next/router";
import { Box, Typography, List, ListItemButton, ListItemText, Divider } from "@mui/material";

import UserProfile from "../components/UserProfile";
import { usePlayground } from "../services/playground";

const Sidebar: React.FC = () => {
  const { connectedChain } = usePlayground();
  const { showCheckout, showWalletConnectScanner, showWalletUI } = useWalletServicesPlugin();
  const { web3Auth, isConnected } = useWeb3Auth();
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  const goToExplorer = () => {
    window.open(connectedChain?.blockExplorerUrl || "", "_blank");
  };

  const goToSourceCode = () => {
    window.open("https://github.com/Web3Auth/web3auth-pnp-examples/tree/main/web-modal-sdk/react-modal-playground", "_blank");
  };

  const goToFaucet = () => {
    if (connectedChain?.chainId === "0xaa36a7") {
      window.open("https://www.infura.io/faucet/sepolia", "_blank");
    } else if (connectedChain?.chainId === "0x13882") {
      window.open("https://faucet.polygon.technology/", "_blank");
    }
  };

  const renderLink = (label: string, onClick: () => void, isActive: boolean) => (
    <ListItemButton onClick={onClick} selected={isActive}>
      <ListItemText
        primary={
          <Typography variant={isActive ? "body1" : "body2"} fontWeight={isActive ? "bold" : "normal"}>
            {label}
          </Typography>
        }
      />
    </ListItemButton>
  );

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        width: 240,
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        p: 2,
      }}
    >
      <Box>
        <Typography variant="caption" color="textSecondary" fontWeight="medium" sx={{ px: 2, py: 1 }}>
          MENU
        </Typography>
        <Divider />
        <List>
          {renderLink("Main Page", () => navigate("/"), router.pathname === "/")}
          {renderLink("Signing/ Transaction", () => navigate("/transaction"), router.pathname === "/transaction")}
          {renderLink("Smart Contract Interactions", () => navigate("/contract"), router.pathname === "/contract")}
          {renderLink("Server Side Verification", () => navigate("/server-side-verification"), router.pathname === "/server-side-verification")}

          {isConnected && web3Auth?.connectedAdapterName === WALLET_ADAPTERS.AUTH && (
            <>
              {renderLink("WalletConnect Scanner", showWalletConnectScanner, false)}
              {renderLink("Wallet UI", showWalletUI, false)}
              {(connectedChain?.chainId === "0xaa36a7" || connectedChain?.chainId === "0x13882")
                ? renderLink("Faucet Link", goToFaucet, false)
                : renderLink("Fiat On Ramp", showCheckout, false)}
              {renderLink("Explorer Link", goToExplorer, false)}
              {renderLink("Source Code", goToSourceCode, false)}
            </>
          )}
        </List>
      </Box>
      <UserProfile />
    </Box>
  );
};

export default Sidebar;
