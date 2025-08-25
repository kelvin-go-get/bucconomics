import GlassCard from "./ui/GlassCard";
import { communities } from "@/lib/data";

export default function Leaderboard() {
  const top = [...communities]
    .sort((a, b) => b.marginPct - a.marginPct)
    .slice(0, 5);
  return (
    <GlassCard className="p-6">
      <div className="text-sm text-blue-200/80">Top Communities</div>
      <div className="text-lg font-semibold mt-1">By Margin / Growth</div>
      <div className="mt-4 space-y-2">
        {top.map((c, i) => (
          <div key={c.id} className="flex items-center gap-3">
            <div className="w-6 text-blue-200/70">#{i + 1}</div>
            <div className="flex-1">{c.name}</div>
            <div className="text-blue-100/90">{c.marginPct}%</div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
