import GlassCard from "./ui/GlassCard";
import { tokenPrice } from "@/lib/data";

export default function TokenPricePanel() {
  const up = tokenPrice.change24h >= 0;
  return (
    <GlassCard className="p-6">
      <div className="text-sm text-blue-200/80">Token</div>
      <div className="flex items-end gap-2 mt-1">
        <div className="text-2xl font-semibold">{tokenPrice.symbol}</div>
        <div className={`text-sm ${up ? "text-emerald-300" : "text-rose-300"}`}>
          {up ? "▲" : "▼"} {tokenPrice.change24h}%
        </div>
      </div>
      <div className="text-3xl font-semibold mt-2">
        £{tokenPrice.price.toFixed(2)}
      </div>
      <div className="text-blue-200/70 text-sm mt-1">
        Mkt Cap: £{(tokenPrice.marketCap / 1e6).toFixed(1)}M
      </div>
    </GlassCard>
  );
}
