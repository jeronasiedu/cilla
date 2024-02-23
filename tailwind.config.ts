import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      keyframes: {
        wobble: {
          "0%, 100%": {
            transform: "translateX(0%)",
            transformOrigin: "50% 50%",
          },
          "15%": {
            transform: "translateX(-10px) rotate(-5deg)",
          },
          "30%": {
            transform: "translateX(5px) rotate(5deg)",
          },
          "45%": {
            transform: "translateX(-5px) rotate(-3deg)",
          },
          "60%": {
            transform: "translateX(3px) rotate(2deg)",
          },
          "75%": {
            transform: "translateX(-2px) rotate(-1deg)",
          },
        },
      },
      animation: {
        wobble: "wobble 2s ease infinite normal",
        "pulse-slow": "pulse 8s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
