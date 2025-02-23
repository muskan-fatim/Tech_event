import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-blue-600">
      <div className="relative flex flex-col items-center">
        {/* Spinning Globe */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="w-24 h-24 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"
        />

        {/* Glowing Text */}
        <h2 className="mt-6 text-2xl font-semibold text-white animate-pulse">
          Loading Tech Events...
        </h2>
      </div>
    </div>
  );
};

export default Loader;
