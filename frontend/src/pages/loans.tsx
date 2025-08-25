import AppLayout from "@/components/layout/AppLayout";
import GlassCard from "@/components/ui/GlassCard";
import ImpactCounters from "@/components/ImpactCounters";
import { loans } from "@/lib/data";

function currency(n: number) {
  return new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  }).format(n);
}

export default function LoansPage() {
  return (
    <AppLayout>
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Loans</h1>

      {/* Loan Stats Counters */}
      <div className="mb-6">
        <ImpactCounters />
      </div>

      {/* Loans Table */}
      <GlassCard className="p-2 overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-3 text-xs uppercase tracking-wide text-blue-200/70">
          <div className="col-span-2">Loan ID</div>
          <div className="col-span-3">Product</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">Rate</div>
          <div className="col-span-2">Next Due</div>
          <div className="col-span-1 text-right">Status</div>
        </div>
        {loans.map((l, i) => (
          <div
            key={l.id}
            className={`grid grid-cols-12 items-center px-4 py-3 text-sm ${
              i % 2 ? "bg-white/5" : ""
            }`}
          >
            <div className="col-span-2 font-mono">{l.id}</div>
            <div className="col-span-3">{l.product}</div>
            <div className="col-span-2">{currency(l.amount)}</div>
            <div className="col-span-2">{(l.rate * 100).toFixed(1)}%</div>
            <div className="col-span-2">{l.nextDue}</div>
            <div className="col-span-1 text-right">
              <span
                className={`px-2 py-1 rounded-lg border ${
                  l.status === "Active"
                    ? "border-emerald-400/40 text-emerald-300 bg-emerald-300/10"
                    : "border-blue-300/30 text-blue-200 bg-blue-200/10"
                }`}
              >
                {l.status}
              </span>
            </div>
          </div>
        ))}
      </GlassCard>
    </AppLayout>
  );
}
