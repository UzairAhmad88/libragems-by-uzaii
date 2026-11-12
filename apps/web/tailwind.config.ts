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
        forest: {
          DEFAULT: "#173D30",
          deep: "#102C23",
          mid: "#214B3B",
          muted: "#456B59",
          light: "#214B3B",
        },
        offwhite: {
          DEFAULT: "#F5F3EB",
        },
        ivory: {
          DEFAULT: "#FAF9F4",
        },
        cream: {
          DEFAULT: "#EEECE2",
        },
        neutral: {
          light: "#E5E3D9",
        },
        beige: {
          DEFAULT: "#F5F3EB",
        },
        champagne: {
          DEFAULT: "#C5A66A",
          light: "#DFCCA4",
        },
        charcoal: {
          DEFAULT: "#252A27",
        },
        ink: {
          DEFAULT: "#252A27",
        },
        stone: {
          DEFAULT: "#59615C",
        },
        border: {
          DEFAULT: "#E5E3D9",
          subtle: "#EEECE2",
        },
        state: {
          success: "#2D6A4F",
          warning: "#A36A00",
          error: "#9E2A2B",
        },
      },
      fontFamily: {
        heading: [
          "var(--font-heading)",
          "Plus Jakarta Sans",
          "Manrope",
          "-apple-system",
          "sans-serif",
        ],
        serif: [
          "var(--font-heading)",
          "Plus Jakarta Sans",
          "Cormorant Garamond",
          "Georgia",
          "serif",
        ],
        sans: [
          "var(--font-inter)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(16, 55, 41, 0.05)",
        "card-hover": "0 8px 24px rgba(16, 55, 41, 0.08)",
        drawer: "0 20px 40px rgba(16, 55, 41, 0.15)",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
