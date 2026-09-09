import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#FFFBFC",
          100: "#FDEEF1",
          200: "#FBDFE6",
          300: "#F6C4D0",
          400: "#EFA0B3",
          500: "#E27A93",
          600: "#C85C77",
          700: "#A8455F",
          800: "#7E3349",
          900: "#5B1A2B",
        },
        rosegold: {
          300: "#E8D5B5",
          400: "#D9BD8D",
          500: "#C9A66B",
          600: "#B08A4E",
        },
        wine: "#5B1A2B",
        graphite: "#33302E",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
