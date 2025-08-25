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
import { useState } from "react";

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

  const isConnected = !!web3.address;

  async function onConnect() {
    try {
      const state = await connectWallet();
      setWeb3(state);
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message || "Failed to connect wallet");
      } else {
        alert("Failed to connect wallet");
      }
    }
  }

  async function onDeposit() {
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
  }
  async function onWithdraw() {
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
  }
  async function onSwap() {
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
                className="rounded-xl px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                Connect
              </button>
            ) : (
              <span className="text-xs bg-emerald-400/15 border border-emerald-300/30 px-2 py-1 rounded-lg">
                Connected
              </span>
            )}
          </div>
          <div className="mt-2 font-mono text-sm">
            {isConnected ? web3.address : "Not connected"}
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
