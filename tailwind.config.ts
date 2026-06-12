import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "#0E0420",
          800: "#150733",
          700: "#1B0B3A",
        },
        royal: {
          900: "#2E1065",
          800: "#4C1D95",
          700: "#6D28D9",
          accent: "#A855F7",
        },
        gold: {
          light: "#FFD56A",
          DEFAULT: "#F5B642",
          dark: "#C8932B",
          glow: "#FFE9A8",
        },
        success: "#34D399",
        danger: "#F43F5E",
        ink: {
          DEFAULT: "#F8F5FF",
          soft: "#CBB7E8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cinzel", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        numeric: ["var(--font-numeric)", "Sora", "sans-serif"],
      },
      boxShadow: {
        "gold-glow":
          "0 0 24px rgba(245,182,66,0.45), 0 0 60px rgba(168,85,247,0.25)",
        "purple-glow": "0 0 30px rgba(109,40,217,0.55)",
        "success-glow": "0 0 28px rgba(52,211,153,0.55)",
        "danger-glow": "0 0 28px rgba(244,63,94,0.5)",
        glass: "0 8px 32px rgba(0,0,0,0.45)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #FFE9A8 0%, #F5B642 45%, #C8932B 100%)",
        "stage-radial":
          "radial-gradient(circle at 50% 0%, #2E1065 0%, #150733 45%, #0E0420 100%)",
        "royal-gradient": "linear-gradient(135deg, #6D28D9 0%, #4C1D95 100%)",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "60%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        pop: "pop 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
