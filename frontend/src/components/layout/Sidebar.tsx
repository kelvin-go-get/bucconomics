"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getUser } from "@/services/AuthService";

interface User {
  fullName: string;
  email: string;
}

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { href: "/communities", label: "Communities", icon: CommunityIcon },
  { href: "/wallet", label: "Wallet", icon: WalletIcon },
  { href: "/savings", label: "Savings", icon: SavingsIcon },
  { href: "/loans", label: "Loans", icon: LoansIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openUser, setOpenUser] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="h-screen w-[270px] sticky top-0 p-4 flex flex-col gap-4 border-r border-white/10 bg-white/5 backdrop-blur-xl">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 pt-1">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
          ₿
        </span>
        <div>
          <div className="text-lg font-bold tracking-wide">BUCCONOMICS</div>
          <div className="text-[11px] text-blue-200/70">
            Decentralizing Prosperity
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-2 flex-1 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition
                ${
                  active
                    ? "bg-gradient-to-r from-blue-800/50 to-indigo-700/40 border border-white/15"
                    : "hover:bg-white/10 border border-transparent"
                }`}
              prefetch
            >
              <Icon active={active} />
              <span className="text-sm">{label}</span>
              <span className="ml-auto opacity-0 group-hover:opacity-100 text-[10px] text-blue-200/70">
                ↗
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="relative">
        <button
          onClick={() => setOpenUser((v) => !v)}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 bg-white/8 border border-white/15 hover:bg-white/12 transition"
        >
          <Image
            src={
              user?.fullName
                ? `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
                    user.fullName
                  )}`
                : "https://ui-avatars.com/api/?name=Guest&background=random&size=128"
            }
            alt="avatar"
            width={32}
            height={32}
            className="h-8 w-8 rounded-xl"
            unoptimized
          />

          <span className="absolute -right-0 -bottom-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#0d1f38]" />
          <div className="text-left">
            <div className="text-sm font-medium leading-tight">
              {user?.fullName || "Guest User"}
            </div>
            <div className="text-[11px] text-blue-200/70">
              {user ? "Online" : "Offline"}
            </div>
          </div>
          <svg
            className={`ml-auto h-4 w-4 transition ${
              openUser ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.207l3.71-2.977a.75.75 0 11.94 1.17l-4.2 3.37a.75.75 0 01-.94 0l-4.2-3.37a.75.75 0 01-.08-1.19z" />
          </svg>
        </button>

        {openUser && (
          <div className="absolute bottom-14 left-0 right-0 overflow-hidden rounded-xl bg-[#0e1e36]/95 border border-white/15 shadow-2xl">
            <Link
              href="/profile"
              className="block px-4 py-2.5 hover:bg-white/10"
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2.5 hover:bg-white/10"
            >
              Settings
            </Link>
            <Link
              href="/my-communities"
              className="block px-4 py-2.5 hover:bg-white/10"
            >
              My Communities
            </Link>
            <button
              className="w-full text-left px-4 py-2.5 hover:bg-white/10 text-red-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

/* --- Minimal inline icons --- */
function DashboardIcon({ active = false }: { active?: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.6"
        d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM3 21h8v-6H3v6zM13 3v6h8V3h-8z"
        className={active ? "text-blue-300" : "text-blue-200/80"}
      />
    </svg>
  );
}
function CommunityIcon({ active = false }: { active?: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.6"
        d="M3 20v-2a4 4 0 014-4h2a4 4 0 014 4v2M13 7a4 4 0 11-8 0 4 4 0 018 0zM17 11a3 3 0 110-6 3 3 0 010 6z"
        className={active ? "text-blue-300" : "text-blue-200/80"}
      />
    </svg>
  );
}
function WalletIcon({ active = false }: { active?: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.6"
        d="M3 7h18v10H3zM16 12h4"
        className={active ? "text-blue-300" : "text-blue-200/80"}
      />
    </svg>
  );
}
function SavingsIcon({ active = false }: { active?: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.6"
        d="M12 3v18M5 9h14M5 15h14"
        className={active ? "text-blue-300" : "text-blue-200/80"}
      />
    </svg>
  );
}
function LoansIcon({ active = false }: { active?: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.6"
        d="M4 7h16v10H4zM7 7V4h10v3"
        className={active ? "text-blue-300" : "text-blue-200/80"}
      />
    </svg>
  );
}
