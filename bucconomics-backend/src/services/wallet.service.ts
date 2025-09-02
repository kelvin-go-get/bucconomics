import { Wallet } from "../models/wallet.model";

export const connectWallet = async (userId: string, address: string) => {
  try {
    const wallet = await Wallet.findByUserId(userId);
    if (wallet) {
      wallet.address = address;
      await wallet.save();
      return wallet;
    }
    return await Wallet.create({ userId, address });
  } catch (err) {
    throw new Error("Error connecting wallet: " + err);
  }
};

export const getBalance = async (userId: string) => {
  try {
    const wallet = await Wallet.findByUserId(userId);
    if (!wallet) throw new Error("Wallet not found");
    return wallet.tokenBalance;
  } catch (err) {
    throw new Error("Error retrieving balance: " + err);
  }
};

export const getTokenInfo = async (userId: string) => {
  try {
    const wallet = await Wallet.findByUserId(userId);
    if (!wallet) throw new Error("Wallet not found");
    return {
      tokenBalance: wallet.tokenBalance,
      governanceWeight: wallet.governanceWeight,
    };
  } catch (err) {
    throw new Error("Error retrieving token info: " + err);
  }
};
export const updateTokenBalance = async (userId: string, amount: number) => {
  try {
    const wallet = await Wallet.findByUserId(userId);
    if (!wallet) throw new Error("Wallet not found");
    wallet.tokenBalance += amount;
    await wallet.save();
    return wallet;
  } catch (err) {
    throw new Error("Error updating token balance: " + err);
  }
};

export const updateGovernanceWeight = async (
  userId: string,
  weight: number
) => {
  try {
    const wallet = await Wallet.findByUserId(userId);
    if (!wallet) throw new Error("Wallet not found");
    wallet.governanceWeight += weight;
    await wallet.save();
    return wallet;
  } catch (err) {
    throw new Error("Error updating governance weight: " + err);
  }
};
