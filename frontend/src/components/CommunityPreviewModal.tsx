import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Community, Proposal } from "@/lib/types";

const COLORS = ["#60a5fa", "#a78bfa", "#34d399"];

export default function CommunityPreviewModal({
  open,
  onClose,
  community,
}: {
  open: boolean;
  onClose: () => void;
  community:
    | (Community & {
        growth: { month: string; members: number }[];
        allocation: { name: string; value: number }[];
        proposals: Proposal[];
      })
    | null;
}) {
  return (
    <AnimatePresence>
      {open && community && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="relative w-full md:max-w-5xl"
          >
            <GlassCard className="p-0 overflow-hidden">
              {/* Banner */}
              <div
                className="h-36 md:h-44 w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${
                    community.banner ||
                    "https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1600&auto=format&fit=crop"
                  })`,
                }}
              >
                <div className="h-full w-full bg-gradient-to-t from-[#0d1f38]/90 to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold">{community.name}</h2>
                    <div className="text-blue-200/80 text-sm">
                      {community.members.toLocaleString()} members ·{" "}
                      {community.marginPct}% margin
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="rounded-xl px-4 py-2 bg-white/12 border border-white/20 hover:bg-white/20">
                      Join Community
                    </button>
                    <button className="rounded-xl px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">
                      Stake BUCC
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {/* Growth */}
                  <GlassCard className="p-4">
                    <div className="mb-2 font-medium">Member Growth</div>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={community.growth}>
                          <defs>
                            <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                              <stop
                                offset="0%"
                                stopColor="#60a5fa"
                                stopOpacity={0.55}
                              />
                              <stop
                                offset="100%"
                                stopColor="#60a5fa"
                                stopOpacity={0.05}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" stroke="#9db6e1" />
                          <YAxis stroke="#9db6e1" />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="members"
                            stroke="#60a5fa"
                            strokeWidth={3}
                            fill="url(#cg)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>

                  {/* Allocation */}
                  <GlassCard className="p-4">
                    <div className="mb-2 font-medium">Fund Allocation</div>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={community.allocation}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={90}
                            label
                          >
                            {community.allocation.map((_, i) => (
                              <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend />
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>
                </div>

                {/* Financials */}
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <GlassCard className="p-4">
                    <div className="text-blue-200/70 text-sm">
                      Total Invested
                    </div>
                    <div className="text-2xl font-semibold mt-1">
                      £{community.invested.toLocaleString()}
                    </div>
                  </GlassCard>
                  <GlassCard className="p-4">
                    <div className="text-blue-200/70 text-sm">
                      Annual Return
                    </div>
                    <div className="text-2xl font-semibold mt-1">
                      {community.marginPct}%
                    </div>
                  </GlassCard>
                  <GlassCard className="p-4">
                    <div className="text-blue-200/70 text-sm">
                      Projected Margin
                    </div>
                    <div className="text-2xl font-semibold mt-1">
                      {community.note}
                    </div>
                  </GlassCard>
                </div>

                {/* Proposals */}
                <div className="mt-6">
                  <div className="font-semibold mb-3">Recent DAO Proposals</div>
                  <div className="grid md:grid-cols-3 gap-3">
                    {community.proposals.map((p) => (
                      <GlassCard key={p.id} className="p-4">
                        <div className="text-sm text-blue-200/70">{p.date}</div>
                        <div className="font-medium mt-1">{p.title}</div>
                        <div className="text-sm text-blue-200/80 mt-1">
                          Status: {p.status}
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 hover:bg-white/20">
                            Vote Yes
                          </button>
                          <button className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 hover:bg-white/20">
                            Vote No
                          </button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20"
                  >
                    Close
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
