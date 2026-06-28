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
          glow: "#6f6fd6",
          soft: "#a6acdf",
          deep: "#262a5e",
        },
        // Gold – Erinnerung
        gold: {
          DEFAULT: "#e8c17a",
          soft: "#f3d9a4",
          light: "#fff1c7",
          deep: "#b8893f",
        },
        // Helles Akzent-Violett/Blau – lebendiges Licht
        accent: {
          DEFAULT: "#7c6dff",
          soft: "#9a8cff",
          blue: "#536bff",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(111, 111, 214, 0.45)",
        "glow-gold": "0 0 48px -12px rgba(232, 193, 122, 0.4)",
        "glow-lg": "0 0 80px -16px rgba(124, 109, 255, 0.5)",
        "glow-gold-lg": "0 0 90px -18px rgba(243, 217, 164, 0.45)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(ellipse at top, rgba(38, 42, 94, 0.35), transparent 60%)",
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
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "aura-pulse": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.75", transform: "scale(1.06)" },
        },
      },
      animation: {
        "fade-up": "fade-up 1s ease-out both",
        "fade-in": "fade-in 1.4s ease-out both",
        "fade-in-fast": "fade-in 0.4s ease-out both",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 5s ease-in-out infinite",
        "scale-in": "scale-in 0.5s ease-out both",
        twinkle: "twinkle 4s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        "spin-slow": "spin-slow 60s linear infinite",
        "aura-pulse": "aura-pulse 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
