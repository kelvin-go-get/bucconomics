import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="backdrop-blur-lg bg-white/10 border-b border-white/20 p-4 flex gap-8 shadow-lg sticky top-0 z-50"
    >
      {["Dashboard", "Communities", "About"].map((item) => (
        <Link
          key={item}
          href={item === "Dashboard" ? "/" : `/${item.toLowerCase()}`}
          className="hover:text-blue-300 transition-colors"
        >
          {item}
        </Link>
      ))}
    </motion.nav>
  );
}
