import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  NightlyWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { IframeWalletAdapter } from "../../packages/sdk/src";
import { WALLET_ICON } from "@/components/icons";
import { SONICX_IFRAME_WALLET_NAME } from "@/constants";

const network = WalletAdapterNetwork.Devnet;

export const endpoint = clusterApiUrl(network);
export const iframeWallet = new IframeWalletAdapter(
  SONICX_IFRAME_WALLET_NAME,
  WALLET_ICON,
);

export const wallets = [
  new PhantomWalletAdapter(),
  new NightlyWalletAdapter(),
  iframeWallet,
];
