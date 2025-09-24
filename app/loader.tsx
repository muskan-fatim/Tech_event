import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-blue-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background with a dark gradient from black to slate-950, matching the hero section */}
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-slate-950 to-black">
        <div className="relative flex flex-col items-center">
          {/* Spinning Ring - Changed to a red/rose gradient */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            className="w-24 h-24 border-4 border-t-transparent rounded-full"
            style={{
              borderImage:
                "conic-gradient(from 0deg at 50% 50%, #FF0000 0%, #8B0000 50%, #FF0000 100%) 1",
            }}
          />

          {/* Pulsating glow behind the ring */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-red-900 blur-xl opacity-40"
          />

          {/* Glowing Text */}
          <h2 className="mt-6 text-2xl font-semibold text-white animate-pulse">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-white to-red-500">
              Loading Tech Events...
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Loader;
