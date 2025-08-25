import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

// Load ToasterProvider only on client
const ToasterProvider = dynamic(
  () =>
    import("@/components/layout/ToasterProvider").then((mod) => mod.default),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1424] via-[#0d1f38] to-[#0a1424] text-white">
      <Component {...pageProps} />
      <ToasterProvider />
    </div>
  );
}
