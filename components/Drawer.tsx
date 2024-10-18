// Drawer.tsx

import { WALLET_ADAPTERS } from "@web3auth/base";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { useWalletServicesPlugin } from "@web3auth/wallet-services-plugin-react-hooks";
import React from "react";
import { useRouter } from "next/router";
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import UserProfile from "../components/UserProfile";
import { usePlayground } from "../services/playground";

interface DrawerProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, setOpen }) => {
  const router = useRouter();
  const { connectedChain } = usePlayground();
  const { showCheckout, showWalletConnectScanner, showWalletUI } = useWalletServicesPlugin();
  const { web3Auth, logout, isConnected } = useWeb3Auth();

  function goToFaucet() {
    if (connectedChain.chainId === "0xaa36a7") {
      window.open("https://www.infura.io/faucet/sepolia");
    } else if (connectedChain.chainId === "0x13882") {
      window.open("https://faucet.polygon.technology/");
    }
  }

  const goToPage = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const handleExternalLink = (url: string) => {
    window.open(url, "_blank");
    setOpen(false);
  };

  const pages = [
    { label: "Main Page", path: "/" },
    { label: "Transactions", path: "/transaction" },
    { label: "Smart Contract Interactions", path: "/contract" },
    { label: "Server Side Verification", path: "/server-side-verification" },
  ];

  const walletLinks = [
    { label: "WalletConnect Scanner", action: showWalletConnectScanner },
    { label: "Wallet UI", action: showWalletUI },
    { label: "Faucet Link", action: goToFaucet }, // Directly using goToFaucet here
    { label: "Fiat On Ramp", action: showCheckout },
    { label: "Explorer Link", action: () => connectedChain.blockExplorerUrl ? handleExternalLink(connectedChain.blockExplorerUrl) : undefined },
    { label: "Source Code", action: () => handleExternalLink("https://github.com/Web3Auth/web3auth-pnp-examples/tree/main/web-modal-sdk/react-modal-playground") },
  ];

  /* const goToFaucet = () => {
    const faucetUrl = connectedChain.chainId === "0xaa36a7"
      ? "https://www.infura.io/faucet/sepolia"
      : "https://faucet.polygon.technology/";
    window.open(faucetUrl, "_blank");
  };
*/
  return (
    <MuiDrawer
      anchor="right"
      open={isOpen}
      onClose={() => setOpen(false)}
      sx={{ "& .MuiDrawer-paper": { width: 300, padding: 2 } }}
    >
      <Box sx={{ py: 2 }}>
        <Typography variant="subtitle2" color="textSecondary" sx={{ px: 2, fontWeight: "medium", textTransform: "uppercase" }}>
          Menu
        </Typography>
        <List>
          {pages.map((page, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => goToPage(page.path)}
                selected={router.pathname === page.path}
              >
                <ListItemText primary={page.label} primaryTypographyProps={{ fontWeight: router.pathname === page.path ? "bold" : "normal" }} />
              </ListItemButton>
            </ListItem>
          ))}
          {isConnected && web3Auth && web3Auth.connectedAdapterName === WALLET_ADAPTERS.AUTH && (
            <>
              <Divider sx={{ my: 2 }} />
              {walletLinks.map((link, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={link.action.bind(null)}>
                    <ListItemText primary={link.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          )}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setOpen(false);
                logout({ cleanup: true });
              }}
            >
              <ListItemText primary="Disconnect" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box sx={{ mt: "auto" }}>
        <UserProfile />
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
