// pages/_app.tsx
import "../styles/globals.css";
import { Web3AuthInnerContext, Web3AuthProvider } from "@web3auth/modal-react-hooks";
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks";
import { AppProps } from "next/app";
import React from "react";
import { Playground } from "../services/playground";
import web3AuthContextConfig from "../services/web3authContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3AuthProvider config={web3AuthContextConfig}>
      <WalletServicesProvider context={Web3AuthInnerContext}>
        <Playground>
          <Component {...pageProps} />
        </Playground>
      </WalletServicesProvider>
    </Web3AuthProvider>
  );
}

export default MyApp;
