import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="p-8 space-y-6">
        <h1 className="text-4xl font-bold">About BUCCONOMICS</h1>
        <p className="text-gray-300">
          BUCC is an innovative, hyper-localized financial ecosystem designed to decentralize
          prosperity using blockchain technology.
        </p>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 p-6 rounded-lg border border-white/20"
        >
          <h2 className="text-2xl font-semibold">Core Features</h2>
          <ul className="list-disc ml-5 mt-3 text-gray-200">
            <li>Consumer savings & community pooling</li>
            <li>Flexible MSME business loans</li>
            <li>Reconsolidation solutions</li>
            <li>DAO-based governance</li>
          </ul>
        </motion.div>
      </div>
    </>
  );
}
