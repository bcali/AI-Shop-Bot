import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Material Design 3 Color System (Blue Theme)
        md: {
          primary: "#1976D2",
          "on-primary": "#FFFFFF",
          "primary-container": "#D1E4FF",
          "on-primary-container": "#001D36",
          secondary: "#535F70",
          "on-secondary": "#FFFFFF",
          "secondary-container": "#D7E3F7",
          "on-secondary-container": "#101C2B",
          tertiary: "#6B5778",
          "on-tertiary": "#FFFFFF",
          "tertiary-container": "#F2DAFF",
          "on-tertiary-container": "#251431",
          error: "#BA1A1A",
          "on-error": "#FFFFFF",
          "error-container": "#FFDAD6",
          "on-error-container": "#410002",
          background: "#FDFCFF",
          "on-background": "#1A1C1E",
          surface: "#FDFCFF",
          "on-surface": "#1A1C1E",
          "surface-variant": "#DFE2EB",
          "on-surface-variant": "#43474E",
          outline: "#73777F",
          "outline-variant": "#C3C7CF",
          "surface-container-lowest": "#FFFFFF",
          "surface-container-low": "#F2F3F7",
          "surface-container": "#EDEEF2",
          "surface-container-high": "#E7E8EC",
          "surface-container-highest": "#E1E2E6",
        },
        // Platform Specific
        shopee: "#EE4D2D",
        lazada: "#0F146F",
        amazon: "#FF9900",
        success: "#146C2E",
      },
      borderRadius: {
        "md-xs": "4px",
        "md-s": "8px",
        "md-m": "12px",
        "md-l": "16px",
        "md-xl": "28px",
        "md-full": "9999px",
        lg: "0.625rem",
        md: "calc(0.625rem - 2px)",
        sm: "calc(0.625rem - 4px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

