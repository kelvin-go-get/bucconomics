import { useEffect, useState } from "react";
import GlassCard from "./ui/GlassCard";

function useCountUp(target: number, duration = 1200) {
  const [value, set] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      set(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return value;
}

export default function ImpactCounters() {
  const msmes = useCountUp(428);
  const jobs = useCountUp(1264);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <GlassCard className="p-6">
        <div className="text-sm text-blue-200/80">Total MSMEs Funded</div>
        <div className="text-4xl font-semibold mt-2">
          {msmes.toLocaleString()}
        </div>
      </GlassCard>
      <GlassCard className="p-6">
        <div className="text-sm text-blue-200/80">Estimated Jobs Created</div>
        <div className="text-4xl font-semibold mt-2">
          {jobs.toLocaleString()}
        </div>
      </GlassCard>
    </div>
  );
}
