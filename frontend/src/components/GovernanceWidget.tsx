import GlassCard from "./ui/GlassCard";
import { useState } from "react";

export default function GovernanceWidget() {
  const [yes, setYes] = useState(62);
  const [no, setNo] = useState(38);

  function vote(v: "yes" | "no") {
    if (v === "yes") setYes((y) => Math.min(100, y + 1));
    else setNo((n) => Math.min(100, n + 1));
  }

  return (
    <GlassCard className="p-6">
      <div className="text-sm text-blue-200/80">Active Proposal</div>
      <div className="text-lg font-semibold mt-1">
        Fund Local MSME Bakery (£50k)
      </div>
      <div className="text-blue-200/70 text-sm">
        Quadratic voting · Ends in 2d 6h
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => vote("yes")}
          className="rounded-xl px-4 py-2 bg-emerald-400/15 border border-emerald-300/30 hover:bg-emerald-400/25"
        >
          Vote Yes
        </button>
        <button
          onClick={() => vote("no")}
          className="rounded-xl px-4 py-2 bg-rose-400/15 border border-rose-300/30 hover:bg-rose-400/25"
        >
          Vote No
        </button>
      </div>

      <div className="mt-4">
        <div className="text-sm text-blue-200/70 mb-2">Live Tally</div>
        <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden border border-white/15">
          <div
            className="h-full bg-emerald-400/70"
            style={{ width: `${yes}%` }}
          />
        </div>
        <div className="mt-1 text-xs text-blue-200/80">
          Yes {yes}% · No {no}%
        </div>
      </div>
    </GlassCard>
  );
}
