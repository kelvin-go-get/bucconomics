import AppLayout from "@/components/layout/AppLayout";
import GlassCard from "@/components/ui/GlassCard";
import { savings, personalSavingsSeries } from "@/lib/data";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import { useState } from "react";

export default function SavingsPage() {
  const [autoSave, setAutoSave] = useState({
    enabled: true,
    amount: 50,
    cadence: "Weekly",
  });

  return (
    <AppLayout>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Savings</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal growth */}
        <GlassCard className="p-6">
          <div className="font-semibold">Your Savings Growth</div>
          <div className="h-64 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={personalSavingsSeries}>
                <defs>
                  <linearGradient id="sv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.55} />
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
                  dataKey="value"
                  stroke="#60a5fa"
                  strokeWidth={3}
                  fill="url(#sv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Auto-save */}
        <GlassCard className="p-6">
          <div className="font-semibold">Auto-Save</div>
          <div className="mt-3 flex items-center gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={autoSave.enabled}
                onChange={(e) =>
                  setAutoSave((s) => ({ ...s, enabled: e.target.checked }))
                }
              />
              <span>Enable</span>
            </label>
            <input
              type="number"
              value={autoSave.amount}
              onChange={(e) =>
                setAutoSave((s) => ({
                  ...s,
                  amount: Number(e.target.value) || 0,
                }))
              }
              className="px-3 py-2 bg-white/10 border border-white/15 rounded-xl outline-none w-28"
            />
            <select
              value={autoSave.cadence}
              onChange={(e) =>
                setAutoSave((s) => ({ ...s, cadence: e.target.value }))
              }
              className="px-3 py-2 bg-white/10 border border-white/15 rounded-xl outline-none"
            >
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div className="text-sm text-blue-200/80 mt-2">
            Will auto-deposit £{autoSave.amount}{" "}
            {autoSave.cadence.toLowerCase()} into your selected pool.
          </div>
        </GlassCard>
      </div>

      {/* Plans */}
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {savings.map((s, i) => (
          <GlassCard key={i} className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold">{s.plan}</div>
              <span className="text-xs px-2 py-1 rounded-lg bg-white/10 border border-white/15">
                {s.apy}% APY
              </span>
            </div>
            <div className="mt-3 text-blue-100/85">
              Balance:{" "}
              <span className="font-semibold">
                £{s.balance.toLocaleString()}
              </span>
            </div>
            <div className="text-blue-200/70 text-sm">Since {s.since}</div>

            <div className="mt-4">
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden border border-white/15">
                <div
                  className="h-full bg-indigo-400/70"
                  style={{ width: `${100 - (s.daysLeft / s.lockDays) * 100}%` }}
                />
              </div>
              <div className="text-xs text-blue-200/80 mt-1">
                {s.daysLeft} days until unlock
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button className="rounded-xl px-4 py-2 bg-white/15 border border-white/20 hover:bg-white/25">
                Top Up
              </button>
              <button className="rounded-xl px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">
                Withdraw
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </AppLayout>
  );
}
