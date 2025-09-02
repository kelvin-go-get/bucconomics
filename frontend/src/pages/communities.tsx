import AppLayout from "@/components/layout/AppLayout";
import GlassCard from "@/components/ui/GlassCard";
import CommunityPreviewModal from "@/components/CommunityPreviewModal";
import { useState } from "react";
import {
  communities,
  communityGrowth,
  allocation,
  proposals,
} from "@/lib/data";
import { Community } from "@/lib/types";

function currency(n: number) {
  return new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  }).format(n);
}

export default function CommunitiesPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Community | null>(null);

  const openPreview = (c: Community) => {
    setSelected(c);
    setOpen(true);
  };

  return (
    <AppLayout>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Communities</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {communities.map((c) => (
          <GlassCard key={c.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold">{c.name}</div>
              <span className="text-xs px-2 py-1 rounded-lg bg-white/10 border border-white/15">
                {c.members.toLocaleString()} members
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-blue-200/70">Invested</div>
                <div className="font-medium">{currency(c.invested)}</div>
              </div>
              <div>
                <div className="text-blue-200/70">Margin</div>
                <div className="font-medium">{c.marginPct}%</div>
              </div>
              <div>
                <div className="text-blue-200/70">Note</div>
                <div className="font-medium truncate" title={c.note}>
                  {c.note}
                </div>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => openPreview(c)}
                className="rounded-xl px-4 py-2 bg-white/15 border border-white/20 hover:bg-white/25 transition"
              >
                View
              </button>
              <button className="rounded-xl px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition shadow-lg">
                Join
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <CommunityPreviewModal
        open={open}
        onClose={() => setOpen(false)}
        community={
          selected
            ? {
                ...selected,
                growth: communityGrowth[selected.id],
                allocation: allocation[selected.id],
                proposals: proposals[selected.id],
              }
            : null
        }
      />
    </AppLayout>
  );
}
