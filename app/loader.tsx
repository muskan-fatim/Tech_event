import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-950 via-purple-900 to-blue-800 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 transition-colors duration-500">
  <div className="relative flex flex-col items-center">
    {/* Spinning Globe */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      className="w-24 h-24 border-[6px] border-purple-400 border-t-transparent rounded-full shadow-xl shadow-purple-500/30"
    />

    {/* Glowing Text */}
    <h2 className="mt-6 text-2xl font-semibold text-white animate-pulse drop-shadow-lg tracking-wide">
      Loading Tech Events...
    </h2>
  </div>
</div>

  );
};

export default Loader;
