import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bridge: {
          gold: "#F59E0B",
          "gold-light": "#FCD34D",
          "gold-dark": "#D97706",
          violet: "#8B5CF6",
          "violet-light": "#A78BFA",
          rose: "#FB7185",
          teal: "#14B8A6",
          blue: "#3B82F6",
        },
        cream: "#FFFBF0",
        "warm-white": "#FFF7ED",
        card: "#FFFFFF",
        "gold-soft": "rgba(245, 158, 11, 0.08)",
        "violet-soft": "rgba(139, 92, 246, 0.08)",
        primary: "#1C1917",
        secondary: "#57534E",
        muted: "#A8A29E",
        border: "#E7E5E4",
        "border-gold": "rgba(245, 158, 11, 0.3)",
        "border-violet": "rgba(139, 92, 246, 0.3)",
      },
      fontFamily: {
        sans: [
          "var(--font-jakarta)",
          "Plus Jakarta Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "var(--font-playfair)",
          "Playfair Display",
          "ui-serif",
          "Georgia",
          "serif",
        ],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out both",
        "gentle-pulse": "gentlePulse 3s ease-in-out infinite",
        "warm-glow": "warmGlow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        gentlePulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        warmGlow: {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(245, 158, 11, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 25px rgba(245, 158, 11, 0.4)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
