import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}

export type Web3State = {
  provider?: ethers.BrowserProvider;
  signer?: ethers.Signer;
  address?: string;
  network?: ethers.Network;
};

export async function connectWallet(): Promise<Web3State> {
  if (!window.ethereum) throw new Error("MetaMask not found");
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const network = await provider.getNetwork();
  return { provider, signer, address, network };
}

// Mock contract interaction placeholders
export async function depositBUCC(amount: number) {
  // TODO: replace with real contract call
  await new Promise((r) => setTimeout(r, 1200));
  return { hash: "0x" + Math.random().toString(16).slice(2), amount };
}
export async function withdrawBUCC(amount: number) {
  await new Promise((r) => setTimeout(r, 1200));
  return { hash: "0x" + Math.random().toString(16).slice(2), amount };
}
export async function swapUSDCtoBUCC(amount: number) {
  await new Promise((r) => setTimeout(r, 1000));
  return { hash: "0x" + Math.random().toString(16).slice(2), amount };
}
