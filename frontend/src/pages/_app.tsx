import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import AuthGuard from "@/components/AuthGuard";
import Loading from "@/components/common/Loading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connectWallet, Web3State } from "@/lib/web3";
import WalletPromptModal from "@/components/common/WalletPromptModal";

// Load ToasterProvider only on client
const ToasterProvider = dynamic(
  () =>
    import("@/components/layout/ToasterProvider").then((mod) => mod.default),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [web3, setWeb3] = useState<Web3State>({});

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleStart = () => {
      setLoading(true);
    };

    const handleStop = () => {
      timeout = setTimeout(() => setLoading(false));
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
      clearTimeout(timeout);
    };
  }, [router]);

  async function onConnect() {
    try {
      const state = await connectWallet();
      setWeb3(state);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1424] via-[#0d1f38] to-[#0a1424] text-white">
      {loading && <Loading />}

      <AuthGuard>
        <Component {...pageProps} />

        {/* Wallet modal prompt */}
        <WalletPromptModal isConnected={!!web3.address} onConnect={onConnect} />
      </AuthGuard>
      <ToasterProvider />
    </div>
  );
}
