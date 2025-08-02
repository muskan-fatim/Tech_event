import { motion } from "framer-motion";

const Loader = () => {
  return (
    // Background with a dark gradient from black to slate-950, matching the hero section
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-slate-950 to-black">
      <div className="relative flex flex-col items-center">
        {/* Spinning Ring - Changed to a red/rose gradient to match the hero's accent colors */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }} // Slightly faster spin
          className="w-24 h-24 border-4 border-t-transparent rounded-full"
          // Using a conic gradient for a more dynamic and thematic spin
          style={{
            borderImage: "conic-gradient(from 0deg at 50% 50%, #FF0000 0%, #8B0000 50%, #FF0000 100%) 1",
          }}
        />

        {/* Pulsating Glow for the ring to enhance the "loading" effect */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1], // Subtle pulse effect
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-red-900 blur-xl opacity-40"
        />

        {/* Glowing Text - Retained pulse, updated color to a subtle white/red blend */}
        <h2 className="mt-6 text-2xl font-semibold text-white animate-pulse">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-white to-red-500">
            Loading Tech Events...
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Loader;