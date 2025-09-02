"use client";
import { useEffect, useState } from "react";

interface WalletPromptModalProps {
  isConnected: boolean;
  onConnect: () => void;
}

export default function WalletPromptModal({
  isConnected,
  onConnect,
}: WalletPromptModalProps) {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (isConnected || dismissed) return;

    // Show modal after 5s
    const timer = setTimeout(() => setOpen(true), 5000);

    // Re-show modal every 30s if still not connected
    const interval = setInterval(() => {
      if (!isConnected && !dismissed) setOpen(true);
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isConnected, dismissed]);

  function handleDismiss() {
    setOpen(false);
    setDismissed(true);
  }

  if (!open || isConnected) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0d1f38] p-6 rounded-2xl shadow-2xl w-[90%] max-w-md border border-white/20">
        <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
        <p className="text-sm text-blue-200/70 mb-4">
          To get the best experience (transactions, rewards, savings), please
          connect your crypto wallet.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => {
              onConnect();
              setOpen(false);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
          >
            Connect Wallet
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
