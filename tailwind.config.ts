import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores temáticas via variáveis CSS (canais RGB) — ver app/globals.css.
        // O tema é trocado pelo atributo data-theme no <html> (church | legacy).
        night: {
          DEFAULT: "rgb(var(--c-night) / <alpha-value>)",
          800: "rgb(var(--c-night-800) / <alpha-value>)",
          700: "rgb(var(--c-night-700) / <alpha-value>)",
        },
        royal: {
          900: "rgb(var(--c-royal-900) / <alpha-value>)",
          800: "rgb(var(--c-royal-800) / <alpha-value>)",
          700: "rgb(var(--c-royal-700) / <alpha-value>)",
          accent: "rgb(var(--c-royal-accent) / <alpha-value>)",
        },
        gold: {
          light: "rgb(var(--c-gold-light) / <alpha-value>)",
          DEFAULT: "rgb(var(--c-gold) / <alpha-value>)",
          dark: "rgb(var(--c-gold-dark) / <alpha-value>)",
          glow: "rgb(var(--c-gold-glow) / <alpha-value>)",
        },
        success: "#34D399",
        danger: "#F43F5E",
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          soft: "rgb(var(--c-ink-soft) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cinzel", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        numeric: ["var(--font-numeric)", "Sora", "sans-serif"],
      },
      boxShadow: {
        "gold-glow":
          "0 0 24px rgb(var(--c-gold) / 0.45), 0 0 60px rgb(var(--c-royal-accent) / 0.25)",
        "purple-glow": "0 0 30px rgb(var(--c-royal-700) / 0.55)",
        "success-glow": "0 0 28px rgba(52,211,153,0.55)",
        "danger-glow": "0 0 28px rgba(244,63,94,0.5)",
        glass: "0 8px 32px rgba(0,0,0,0.45)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, rgb(var(--c-gold-glow)) 0%, rgb(var(--c-gold)) 45%, rgb(var(--c-gold-dark)) 100%)",
        "stage-radial":
          "radial-gradient(circle at 50% 0%, rgb(var(--c-royal-900)) 0%, rgb(var(--c-night-800)) 45%, rgb(var(--c-night)) 100%)",
        "royal-gradient":
          "linear-gradient(135deg, rgb(var(--c-royal-700)) 0%, rgb(var(--c-royal-800)) 100%)",
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
