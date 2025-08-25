import * as React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

export default function GlassCard({ className = "", ...props }: Props) {
  return (
    <div
      {...props}
      className={
        "rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] " +
        "hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-shadow glass-shimmer " +
        className
      }
    />
  );
}
