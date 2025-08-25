import AppLayout from "@/components/layout/AppLayout";
import GlassCard from "@/components/ui/GlassCard";
import TokenPricePanel from "@/components/TokenPricePanel";
import GovernanceWidget from "@/components/GovernanceWidget";
import Leaderboard from "@/components/Leaderboard";
import ImpactCounters from "@/components/ImpactCounters";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { growthSeries } from "@/lib/data";

export default function Dashboard() {
  return (
    <AppLayout>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-6"
      >
        Dashboard
      </motion.h1>

      <div className="grid gap-6 md:grid-cols-3">
        <TokenPricePanel />
        <GlassCard className="p-6">
          <div className="text-sm text-blue-200/80">Seed Raise</div>
          <div className="text-2xl font-semibold mt-1">£5M</div>
          <p className="text-blue-100/80 mt-2">
            Licenses, pilots, scale tech & compliance, go-to-market.
          </p>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="text-sm text-blue-200/80">Community Impact</div>
          <div className="text-2xl font-semibold mt-1">Adaptive Repayments</div>
          <p className="text-blue-100/80 mt-2">
            Equity-based models improving local economies.
          </p>
        </GlassCard>
      </div>

      <GlassCard className="p-6 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Projected Growth</h2>
          <span className="text-sm text-blue-200/70">
            MSME + Reconsolidation
          </span>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthSeries}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#9db6e1" />
              <YAxis stroke="#9db6e1" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#60a5fa"
                strokeWidth={3}
                fill="url(#g)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <GovernanceWidget />
        <Leaderboard />
        <ImpactCounters />
      </div>
    </AppLayout>
  );
}
