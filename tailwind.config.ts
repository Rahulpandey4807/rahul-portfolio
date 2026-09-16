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
        ink: {
          DEFAULT: "#080D17",
          50: "#F4F6FA",
          100: "#E7ECF5",
          200: "#C7D0E0",
          300: "#8B95A7",
          400: "#5C6478",
          500: "#3A4256",
          600: "#252C3E",
          700: "#171D2C",
          800: "#121A2B",
          900: "#0B1220",
          950: "#080D17",
        },
        amber: {
          DEFAULT: "#F2B84B",
          light: "#F8D585",
          dark: "#C68F2E",
        },
        teal: {
          DEFAULT: "#4FD1C5",
          light: "#8FE6DC",
          dark: "#2FA69B",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      maxWidth: {
        content: "72rem",
        prose: "42rem",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgba(8,13,23,1) 90%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
export default config;
