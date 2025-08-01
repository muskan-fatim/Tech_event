import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // <- This enables class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Optional: add custom dark colors
        darkPurple: "#2e1065",  // Deep purple
        darkGrey: "#1f2937",    // Tailwind's gray-800
      },
    },
  },
  plugins: [],
};

export default config;
