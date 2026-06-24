import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tiefblau – kosmischer Grund
        abyss: {
          DEFAULT: "#05060f",
          900: "#070a1a",
          800: "#0b1030",
          700: "#11183f",
          600: "#1a2455",
        },
        // Violett – Bewusstsein
        violet: {
          glow: "#7c5cff",
          soft: "#a489ff",
          deep: "#3a2a7a",
        },
        // Gold – Erinnerung
        gold: {
          DEFAULT: "#e8c17a",
          soft: "#f3d9a4",
          deep: "#b8893f",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(124, 92, 255, 0.45)",
        "glow-gold": "0 0 48px -12px rgba(232, 193, 122, 0.4)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(ellipse at top, rgba(58, 42, 122, 0.35), transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        drift: {
          "0%": { transform: "translateY(0) translateX(0)" },
          "100%": { transform: "translateY(-60px) translateX(20px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 1s ease-out both",
        "fade-in": "fade-in 1.4s ease-out both",
        "fade-in-fast": "fade-in 0.4s ease-out both",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 5s ease-in-out infinite",
        "scale-in": "scale-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
