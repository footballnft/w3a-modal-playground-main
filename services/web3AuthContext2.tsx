import { AuthAdapter, MFA_LEVELS } from "@web3auth/auth-adapter";
import { UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthOptions } from "@web3auth/modal";
import { BUTTON_POSITION, CONFIRMATION_STRATEGY, WalletServicesPlugin } from "@web3auth/wallet-services-plugin";

import { chain } from "../config/chainConfig";

const clientId = "BDz9cg_NIe3JIdIV3Xdoa-2cfOiW8dS43Un_8ifMmOziPHPiTE4SuTn0AKf6-HC40NIl8nI0ig4PKAa95Pxj6zE";

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig: chain.ethereum,
  },
});

const web3AuthOptions: Web3AuthOptions = {
  chainConfig: chain.ethereum,
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
};

const authAdapter = new AuthAdapter({
  loginSettings: {
    mfaLevel: MFA_LEVELS.OPTIONAL,
  },
  adapterSettings: {
    uxMode: UX_MODE.REDIRECT, // "redirect" | "popup"
  },
});

const walletServicesPlugin = new WalletServicesPlugin({
  wsEmbedOpts: {},
  walletInitOptions: {
    whiteLabel: { showWidgetButton: true, buttonPosition: BUTTON_POSITION.BOTTOM_RIGHT },
    confirmationStrategy: CONFIRMATION_STRATEGY.MODAL,
  },
});

const adapters = await getDefaultExternalAdapters({ options: web3AuthOptions });

const web3AuthContextConfig = {
  web3AuthOptions,
  adapters: [authAdapter, ...adapters],
  plugins: [walletServicesPlugin],
};

export default web3AuthContextConfig;
