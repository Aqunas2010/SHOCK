import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060D18",
          900: "#0B1628", // Primary navy from specification
          850: "#0F1E33",
          800: "#14243A", // Secondary navy
          700: "#1D324E",
          600: "#2B476C",
          500: "#3D608D",
        },
        clinical: {
          bg: "#F4F6F9",     // Page background
          surface: "#FFFFFF",// White card background
          text: "#202B3C",   // Primary text
          muted: "#66758A",  // Secondary text
          border: "#DCE3EB", // Border color
          subtle: "#EDF2F7",
        },
        teal: {
          50: "#F0F7F8",
          100: "#DCEEEF",
          200: "#BCDFE1",
          300: "#92C7CA",
          400: "#65AAB0",
          500: "#438F96",   // Muted teal from specification
          600: "#347379",
          700: "#295A5F",
          800: "#22474B",
          900: "#1B3B3E",
        },
        gold: {
          50: "#FCF9F3",
          100: "#F7F0E0",
          200: "#EEDDBE",
          300: "#E3C898",
          400: "#D6B375",
          500: "#C49A58",   // Muted gold from specification
          600: "#A88042",
          700: "#876431",
          800: "#6B4F27",
          900: "#4A361B",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        editorial: "0 1px 3px 0 rgba(11, 22, 40, 0.06), 0 1px 2px -1px rgba(11, 22, 40, 0.04)",
        card: "0 4px 6px -1px rgba(11, 22, 40, 0.05), 0 2px 4px -2px rgba(11, 22, 40, 0.04)",
        elevated: "0 10px 15px -3px rgba(11, 22, 40, 0.08), 0 4px 6px -4px rgba(11, 22, 40, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
