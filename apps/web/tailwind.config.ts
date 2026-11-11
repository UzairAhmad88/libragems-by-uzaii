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
          DEFAULT: "var(--forest)",
          deep: "var(--forest-deep)",
          mid: "var(--forest-mid)",
          muted: "var(--forest-muted)",
          light: "var(--forest-light)",
        },
        offwhite: {
          DEFAULT: "var(--offwhite)",
        },
        ivory: {
          DEFAULT: "var(--ivory)",
        },
        cream: {
          DEFAULT: "var(--cream)",
        },
        neutral: {
          light: "var(--neutral-light)",
        },
        beige: {
          DEFAULT: "var(--beige)",
        },
        champagne: {
          DEFAULT: "var(--champagne)",
          light: "var(--champagne-light)",
        },
        charcoal: {
          DEFAULT: "var(--charcoal)",
        },
        ink: {
          DEFAULT: "var(--ink)",
        },
        stone: {
          DEFAULT: "var(--stone)",
        },
        border: {
          DEFAULT: "var(--border)",
          subtle: "var(--border-subtle)",
        },
        state: {
          success: "var(--success)",
          warning: "var(--warning)",
          error: "var(--error)",
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
