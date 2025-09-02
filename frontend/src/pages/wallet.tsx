import AppLayout from "@/components/layout/AppLayout";
import GlassCard from "@/components/ui/GlassCard";
import { wallet, txHistory } from "@/lib/data";
import {
  connectWallet,
  depositBUCC,
  withdrawBUCC,
  swapUSDCtoBUCC,
  Web3State,
} from "@/lib/web3";
import { getUser } from "@/services/AuthService";
import { updateProfile } from "@/services/user";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import the necessary functions

function currency(n: number) {
  return new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  }).format(n);
}

export default function WalletPage() {
  const [web3, setWeb3] = useState<Web3State>({});
  const [amount, setAmount] = useState(100);
  const [swapAmt, setSwapAmt] = useState(50);
  const [txs, setTxs] = useState(txHistory);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const isConnected = !!web3.address;

  async function onConnect() {
    try {
      const state = await connectWallet();
      setWeb3(state);

      // Call updateProfile after successful wallet connection
      if (state.address) {
        await updateUserProfileWithWallet(state.address);
      } else {
        toast.error("Wallet address not found after connection.");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message || "Failed to connect wallet");
      } else {
        toast.error("Failed to connect wallet");
      }
    }
  }

  async function updateUserProfileWithWallet(walletAddress: string) {
    try {
      setIsUpdatingProfile(true);
      const user = await getUser();

      if (!user || !user.id) {
        throw new Error("User not found. Please log in again.");
      }

      // Update profile with wallet address
      await updateProfile({
        id: user.id,
        fullName: user.fullName,
        walletAddress: walletAddress,
      });

      toast.success("Wallet connected and profile updated successfully!");
    } catch (error: unknown) {
      console.error("Failed to update profile:", error);
      if (error instanceof Error) {
        toast.error(`Profile update failed: ${error.message}`);
      } else {
        toast.error("Failed to update profile with wallet address");
      }
    } finally {
      setIsUpdatingProfile(false);
    }
  }

  async function onDeposit() {
    try {
      const res = await depositBUCC(amount);
      setTxs([
        {
          id: res.hash,
          date: new Date().toISOString().slice(0, 10),
          type: "Deposit",
          amount,
          token: "BUCC",
          status: "Pending",
        },
        ...txs,
      ]);
      toast.success("Deposit initiated successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Deposit failed: ${error.message}`);
      } else {
        toast.error("Deposit failed");
      }
    }
  }

  async function onWithdraw() {
    try {
      const res = await withdrawBUCC(amount);
      setTxs([
        {
          id: res.hash,
          date: new Date().toISOString().slice(0, 10),
          type: "Withdraw",
          amount,
          token: "BUCC",
          status: "Pending",
        },
        ...txs,
      ]);
      toast.success("Withdrawal initiated successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Withdrawal failed: ${error.message}`);
      } else {
        toast.error("Withdrawal failed");
      }
    }
  }

  async function onSwap() {
    try {
      const res = await swapUSDCtoBUCC(swapAmt);
      setTxs([
        {
          id: res.hash,
          date: new Date().toISOString().slice(0, 10),
          type: "Swap",
          amount: swapAmt,
          token: "USDC→BUCC",
          status: "Pending",
        },
        ...txs,
      ]);
      toast.success("Swap initiated successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Swap failed: ${error.message}`);
      } else {
        toast.error("Swap failed");
      }
    }
  }
  function truncateAddress(address: string, length = 6) {
    if (!address) return "";
    return `${address.slice(0, length)}...${address.slice(-length)}`;
  }

  return (
    <AppLayout>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Wallet</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard className="p-6">
          <div className="text-blue-200/70 text-sm">Available Balance</div>
          <div className="text-3xl font-semibold mt-2">
            {currency(wallet.balance)}
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="text-blue-200/70 text-sm">Reserved</div>
          <div className="text-3xl font-semibold mt-2">
            {currency(wallet.reserved)}
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="text-blue-200/70 text-sm">Rewards</div>
          <div className="text-3xl font-semibold mt-2">
            {currency(wallet.rewards)}
          </div>
        </GlassCard>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-200/70">Wallet</div>
            {!isConnected ? (
              <button
                onClick={onConnect}
                disabled={isUpdatingProfile}
                className="rounded-xl px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 disabled:opacity-50"
              >
                {isUpdatingProfile ? "Updating..." : "Connect"}
              </button>
            ) : (
              <span className="text-xs bg-emerald-400/15 border border-emerald-300/30 px-2 py-1 rounded-lg">
                Connected
              </span>
            )}
          </div>
          <div className="mt-2 font-mono text-sm break-all">
            {isConnected
              ? truncateAddress(web3.address ?? "")
              : "Not connected"}
          </div>
          <div className="mt-4">
            <div className="text-sm text-blue-200/70 mb-1">Amount (BUCC)</div>
            <input
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-white/10 border border-white/15 rounded-xl outline-none"
            />
            <div className="mt-3 flex gap-2">
              <button
                onClick={onDeposit}
                disabled={!isConnected}
                className="rounded-xl px-4 py-2 bg-white/15 border border-white/20 hover:bg-white/25 disabled:opacity-50"
              >
                Deposit
              </button>
              <button
                onClick={onWithdraw}
                disabled={!isConnected}
                className="rounded-xl px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50"
              >
                Withdraw
              </button>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="text-sm text-blue-200/70">Swap</div>
          <div className="text-lg font-semibold mt-1">USDC → BUCC</div>
          <input
            value={swapAmt}
            onChange={(e) => setSwapAmt(Number(e.target.value) || 0)}
            className="mt-3 w-full px-3 py-2 bg-white/10 border border-white/15 rounded-xl outline-none"
          />
          <button
            onClick={onSwap}
            className="mt-3 rounded-xl px-4 py-2 bg-white/15 border border-white/20 hover:bg-white/25"
          >
            Swap
          </button>
          <div className="text-xs text-blue-200/70 mt-2">
            Mock rate 1:1 (testnet)
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-sm text-blue-200/70">Savings Lock-in</div>
          <div className="text-lg font-semibold mt-1">
            Stake BUCC for higher APY
          </div>
          <div className="mt-3">
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden border border-white/15">
              <div
                className="h-full bg-indigo-400/70"
                style={{ width: "64%" }}
              />
            </div>
            <div className="text-xs text-blue-200/80 mt-1">
              64% of period completed
            </div>
          </div>
          <button className="mt-3 rounded-xl px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">
            Manage Stake
          </button>
        </GlassCard>
      </div>

      <GlassCard className="p-2 overflow-hidden mt-6">
        <div className="px-4 py-3 text-xs uppercase tracking-wide text-blue-200/70">
          Recent Transactions
        </div>
        {txs.map((t, i) => (
          <div
            key={t.id}
            className={`grid grid-cols-5 items-center px-4 py-3 text-sm ${
              i % 2 ? "bg-white/5" : ""
            }`}
          >
            <div>{t.date}</div>
            <div>{t.type}</div>
            <div>{t.token}</div>
            <div>£{t.amount.toLocaleString()}</div>
            <div
              className={
                t.status === "Confirmed"
                  ? "text-emerald-300"
                  : t.status === "Pending"
                  ? "text-amber-300"
                  : "text-rose-300"
              }
            >
              {t.status}
            </div>
          </div>
        ))}
      </GlassCard>
    </AppLayout>
  );
}
