/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        status: {
          100: "var(--status)",
        },
        opposite: "var(--opposite)",
        borders: {
          trans: "var(--border-trans)",
          100: "var(--border-100)",
        },
        gray: {
          1: "var(--gray-700)",
          2: "var(--gray-800)",
          3: "var(--gray-900)",
          input: "var(--input-bg)",
        },
        purple: {
          1: "var(--purple-100)",
        },
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
};
export default config;
