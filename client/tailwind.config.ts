import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep blue & midnight base
        background: "#090d18",
        "bg-deep": "#060911",
        "bg-navy": "#0b1326",
        "bg-surface": "rgba(15, 23, 42, 0.72)",
        "bg-surface-elevated": "rgba(23, 34, 58, 0.78)",
        
        // Steel grays
        steel: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },

        // Calm natural palette
        sky: {
          light: "#7dd3fc",
          DEFAULT: "#38bdf8",
          deep: "#0284c7",
        },
        mint: {
          light: "#6ee7b7",
          DEFAULT: "#10b981",
          deep: "#059669",
        },
        golden: {
          light: "#fde047",
          DEFAULT: "#fbbf24",
          deep: "#d97706",
        },
        coral: {
          light: "#fda4af",
          DEFAULT: "#f43f5e",
          deep: "#e11d48",
        },
        amethyst: {
          light: "#c4b5fd",
          DEFAULT: "#8b5cf6",
          deep: "#6d28d9",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "SF Mono", "Fira Code", "monospace"],
        sans: ["Outfit", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        tile: "0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        "tile-hover": "0 20px 40px -12px rgba(14, 165, 233, 0.22), 0 0 25px -5px rgba(56, 189, 248, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.22)",
        "tile-mint": "0 20px 40px -12px rgba(16, 185, 129, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
        "tile-coral": "0 20px 40px -12px rgba(244, 63, 94, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
        "tile-violet": "0 20px 40px -12px rgba(139, 92, 246, 0.22), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
        glow: "0 0 30px rgba(56, 189, 248, 0.25)",
        "glow-mint": "0 0 30px rgba(16, 185, 129, 0.25)",
        "glow-golden": "0 0 30px rgba(251, 191, 36, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
