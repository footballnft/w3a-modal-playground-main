import { ADAPTER_STATUS, CustomChainConfig, IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import * as jose from "jose";
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import { chain } from "../config/chainConfig";
import { getWalletProvider, IWalletProvider } from "./walletProvider";

export interface IPlaygroundContext {
  walletProvider: IWalletProvider | null;
  isLoading: boolean;
  address: string;
  balance: string;
  chainList: { [key: string]: CustomChainConfig };
  chainListOptionSelected: string;
  chainId: string;
  playgroundConsole: string;
  connectedChain: CustomChainConfig;
  getUserInfo: () => Promise<any>;
  getPublicKey: () => Promise<string>;
  getAddress: () => Promise<string>;
  getBalance: () => Promise<string | null>;
  getSignature: (message: string) => Promise<string>;
  sendTransaction: (amount: string, destination: string) => Promise<string>;
  getPrivateKey: () => Promise<string>;
  getChainId: () => Promise<string>;
  deployContract: (abi: any, bytecode: string, initValue: string) => Promise<any>;
  readContract: (contractAddress: string, contractABI: any) => Promise<string>;
  writeContract: (contractAddress: string, contractABI: any, updatedValue: string) => Promise<string>;
  getIdToken: () => Promise<string>;
  verifyServerSide: (idToken: string) => Promise<any>;
  switchChain: (customChainConfig: CustomChainConfig) => Promise<void>;
  updateConnectedChain: (network: string | CustomChainConfig) => void;
}

export const PlaygroundContext = createContext<IPlaygroundContext>({
  walletProvider: null,
  isLoading: false,
  address: "",
  balance: "",
  chainId: "",
  playgroundConsole: "",
  chainList: chain,
  chainListOptionSelected: "ethereum",
  connectedChain: chain.ethereum,
  getUserInfo: async () => null,
  getPublicKey: async () => "",
  getAddress: async () => "",
  getBalance: async () => "",
  getSignature: async () => "",
  sendTransaction: async () => "",
  getPrivateKey: async () => "",
  getChainId: async () => "",
  deployContract: async () => {},
  readContract: async () => "",
  writeContract: async () => "",
  getIdToken: async () => "",
  verifyServerSide: async () => {},
  switchChain: async () => {
    // Your switch chain logic here (if any)
    return; // This explicitly returns undefined, which is compatible with Promise<void>
  },
  updateConnectedChain: () => {},
});

interface IPlaygroundProps {
  children?: ReactNode;
}

export function usePlayground(): IPlaygroundContext {
  return useContext(PlaygroundContext);
}

export const Playground = ({ children }: IPlaygroundProps) => {
  const [walletProvider, setWalletProvider] = useState<IWalletProvider | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [chainList, setChainDetails] = useState(chain);
  const [chainListOptionSelected, setChainListOptionSelected] = useState("ethereum");
  const [chainId, setChainId] = useState<any>(null);
  const [playgroundConsole, setPlaygroundConsole] = useState<string>("");
  const [connectedChain, setConnectedChain] = useState<CustomChainConfig>(chain.ethereum);
  const uiConsole = (...args: unknown[]) => {
    setPlaygroundConsole(`${JSON.stringify(args || {}, null, 2)}\n\n\n\n${playgroundConsole}`);
    console.log(...args);
  };

  const { status, connect, addAndSwitchChain, userInfo, provider, web3Auth, authenticateUser } = useWeb3Auth();
  // const { showCheckout, showWalletConnectScanner, showWalletUI } = useWalletServicesPlugin();

  const setNewWalletProvider = useCallback(
    async (web3authProvider: IProvider) => {
      const newWalletProvider = getWalletProvider(web3authProvider, uiConsole);
  setWalletProvider(newWalletProvider);

  const address = await newWalletProvider?.getAddress();
  if (address) {
    setAddress(address);
  } else {
    setAddress(null); // or handle the undefined case appropriately
  }

  const balance = await newWalletProvider?.getBalance();
  if (balance) {
    setBalance(balance);
  }

  const chainId = await newWalletProvider?.getChainId();
  if (chainId) {
    setChainId(chainId);
  }
}, [chainId, address, balance]);


  useEffect(() => {
    if (status === ADAPTER_STATUS.READY) {
      connect();
    } else if (status === ADAPTER_STATUS.CONNECTED && provider) {
      setNewWalletProvider(provider);
    }
  }, [web3Auth, status, provider, connect, setNewWalletProvider]);

  const getUserInfo = async () => {
    if (!web3Auth) {
      uiConsole("web3Auth not initialized yet");
      return;
    }
    uiConsole(userInfo);
    return userInfo;
  };

  const getPublicKey = async () => {
    if (!web3Auth) {
      uiConsole("web3Auth not initialized yet");
      return "";
    }

    if (walletProvider) {
      const publicKey = await walletProvider.getPublicKey();
      uiConsole(publicKey);
      return publicKey;
    } else {
      uiConsole("No wallet provider available.");
      return "";
    }
  };

  const getAddress = async () => {
    if (!web3Auth) {
      uiConsole("web3Auth not initialized yet");
      return "";
    }

    if (walletProvider) {
      const updatedAddress = await walletProvider.getAddress();
      setAddress(updatedAddress);
      uiConsole(updatedAddress);
      return updatedAddress; // Ensure you return the updated address here.
    } else {
      uiConsole("No wallet provider available.");
      return "";
    }
  };

  const getBalance = async () => {
    if (!web3Auth) {
      uiConsole("web3Auth not initialized yet");
      return "";
    }

    if (walletProvider) {
    const updatedBalance = await walletProvider.getBalance();
    setBalance(updatedBalance);
    uiConsole(updatedBalance);
    return updatedBalance; // Return the updated balance
  } else {
    uiConsole("No wallet provider available.");
    return null; // Return null instead of an empty string
  }
  };

  const getSignature = async (message: string) => {
    if (!web3Auth) {
      uiConsole("web3Auth not initialized yet");
      return "";
    }

    if (walletProvider) {
    const signature = await walletProvider.getSignature(message);
    uiConsole(signature);
    return signature;
  } else {
    uiConsole("web3Auth not initialized yet");
      return "";
  }
  };

  const sendTransaction = async (amount: string, destination: string) => {
    if (!web3Auth) {
      uiConsole("web3Auth not initialized yet");
      return "";
    }

    if (walletProvider) {
    const receipt = await walletProvider.sendTransaction(amount, destination);
    uiConsole(receipt);
    return receipt;
  } else {
    uiConsole("web3Auth not initialized yet");
      return "";
  }
  };

  const getPrivateKey = async () => {
    if (!web3Auth) {
      uiConsole("web3Auth not initialized yet");
      return "";
    }

    if (walletProvider) {
    const privateKey = await walletProvider.getPrivateKey();
    uiConsole("Private Key: ", privateKey);
    return privateKey;
  } else {
    uiConsole("web3Auth not initialized yet");
      return "";
  }
  };

  const getChainId = async () => {
    if (!web3Auth) {
      uiConsole("web3Auth not initialized yet");
      return "";
    }

    if (walletProvider) {
      const chainId = await walletProvider.getChainId();
      uiConsole(chainId);
      return chainId;
    } else {
      uiConsole("No wallet provider available.");
      return "";
    }
  };

  const deployContract = async (abi: any, bytecode: string, initValue: string): Promise<any> => {
    if (!web3Auth) {
      uiConsole("web3Auth not initialized yet");
      return;
    }

    if (walletProvider) {
    const receipt = await walletProvider.deployContract(abi, bytecode, initValue);
    return receipt;
  } else {
    uiConsole("web3Auth not initialized yet");
      return;
  }
  };

  const readContract = async (contractAddress: string, contractABI: any): Promise<string> => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return "provider not initialized"; // Ensure a string is returned
    }

    if (walletProvider) {
    const message = await walletProvider.readContract(contractAddress, contractABI);
    uiConsole(message);
    return message;
  } else {
    uiConsole("provider not initialized yet");
      return "provider not initialized"; // Ensure a string is returned
  }
  };

  const writeContract = async (contractAddress: string, contractABI: any, updatedValue: string): Promise<string> => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return "provider not initialized"; // Ensure a string is returned
    }
    if (walletProvider) {
      const receipt = await walletProvider.writeContract(contractAddress, contractABI, updatedValue);
      uiConsole(receipt);

      if (receipt) {
        setTimeout(async () => {
          await readContract(contractAddress, contractABI);
        }, 2000);
        return receipt; // Return the receipt to ensure the function always returns a string
      } else {
        return "transaction failed"; // Ensure a string is returned even if receipt is not available
      }
    } else {
      uiConsole("No wallet provider available.");
      return "No wallet provider available"; // Ensure a string is returned when walletProvider is null
    }
  };

  const parseToken = (token: any) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64 || ""));
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getIdToken = async () => {
    const idToken = await authenticateUser();
    uiConsole("Id Token: ", parseToken(idToken.idToken));
    return idToken.idToken;
  };

  const verifyServerSide = async (idTokenInFrontend: string) => {
    try {
      if (!provider) {
        uiConsole("provider not initialized yet");
        return;
      }
      // ideally this should be done on the server side
      if (web3Auth && web3Auth.connectedAdapterName === WALLET_ADAPTERS.AUTH) {
        const pubkey = await getPublicKey();
        const jwks = jose.createRemoteJWKSet(new URL("https://api-auth.web3auth.io/jwks"));
        const jwtDecoded = await jose.jwtVerify(idTokenInFrontend, jwks, {
          algorithms: ["ES256"],
        });
        const pubKeyFromIdToken = (jwtDecoded.payload as any).wallets.find((x: { type: string }) => x.type === "web3auth_app_key").public_key;

        if (pubKeyFromIdToken === pubkey) {
          uiConsole(
            "Validation Success!",
            "Public Key from Provider: ",
            pubkey,
            "Public Key from decoded JWT: ",
            pubKeyFromIdToken,
            "Parsed Id Token: ",
            await parseToken(idTokenInFrontend)
          );
        } else {
          uiConsole(
            "Validation Failed!",
            "Public Key from Provider: ",
            pubkey,
            "Public Key from decoded JWT: ",
            pubKeyFromIdToken,
            "Parsed Id Token: ",
            await parseToken(idTokenInFrontend)
          );
        }
      } else {
        const jwks = jose.createRemoteJWKSet(new URL("https://authjs.web3auth.io/jwks"));
        const jwtDecoded = await jose.jwtVerify(idTokenInFrontend, jwks, {
          algorithms: ["ES256"],
        });
        const addressFromIdToken = (jwtDecoded.payload as any).wallets.find((x: { type: string }) => x.type === "ethereum").address;
        if (addressFromIdToken.toLowerCase() === address?.toLowerCase()) {
          uiConsole(
            "Validation Success!",
            "Address from Provider: ",
            address,
            "Address from decoded JWT: ",
            addressFromIdToken,
            "Parsed Id Token: ",
            await parseToken(idTokenInFrontend)
          );
        }
      }
    } catch (e) {
      uiConsole(e);
    }
  };

  const updateConnectedChain = (chainDetails: string | CustomChainConfig) => {
    if (typeof chainDetails === "string") {
      setConnectedChain(chainList[chainDetails]);
      setChainListOptionSelected(chainDetails);
      return;
    }
    if (typeof chainDetails === "object") {
      if (
        chainDetails.displayName && // Check if displayName is defined
        !(
          chainDetails.displayName in
          Object.keys(chainList).map(function (k) {
            return chainList[k].displayName;
          })
        )
      ) {
        setChainDetails({ ...chain, custom: chainDetails });
      }
      setConnectedChain(chainDetails);
      setChainListOptionSelected("custom");
      return;
    }
    uiConsole("No network or chainDetails provided");
  };

  const switchChain = async (chainConfig: CustomChainConfig) => {
    if (!web3Auth || !provider) {
      uiConsole("web3Auth or provider is not initialized yet");
      return;
    }
    if (!walletProvider) {
      uiConsole("No wallet provider available.");
      return;
    }
    try {
      setIsLoading(true);
      await addAndSwitchChain(chainConfig);

      const chainId = await walletProvider.getChainId();
      setChainId(chainId);

      const address = await walletProvider.getAddress();
      setAddress(address);

      const balance = await walletProvider.getBalance();
      setBalance(balance);

      updateConnectedChain(chainConfig);
      setIsLoading(false);
      uiConsole("Chain switched successfully");
    } catch (error) {
      uiConsole("Failed to switch chain", error);
      setIsLoading(false);
    }
  };

  const contextProvider = {
    walletProvider,
    isLoading,
    address: address || "", // Ensure address defaults to an empty string if null
    balance: balance || "",
    chainId: chainId || "",
    playgroundConsole,
    connectedChain,
    chainList,
    chainListOptionSelected,
    getUserInfo,
    getPublicKey,
    getAddress,
    getBalance,
    getSignature,
    sendTransaction,
    getPrivateKey,
    getChainId,
    deployContract,
    readContract,
    writeContract,
    verifyServerSide,
    getIdToken,
    switchChain,
    updateConnectedChain,
  };
  return <PlaygroundContext.Provider value={contextProvider}>{children}</PlaygroundContext.Provider>;
};
