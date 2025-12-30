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
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Material Design 3 Color System
        md: {
          primary: "#6750A4",
          "on-primary": "#FFFFFF",
          "primary-container": "#EADDFF",
          "on-primary-container": "#21005D",
          secondary: "#625B71",
          "on-secondary": "#FFFFFF",
          "secondary-container": "#E8DEF8",
          "on-secondary-container": "#1D192B",
          tertiary: "#7D5260",
          "on-tertiary": "#FFFFFF",
          "tertiary-container": "#FFD8E4",
          "on-tertiary-container": "#31111D",
          error: "#B3261E",
          "on-error": "#FFFFFF",
          "error-container": "#F9DEDC",
          "on-error-container": "#410E0B",
          background: "#FFFBFE",
          "on-background": "#1C1B1F",
          surface: "#FFFBFE",
          "on-surface": "#1C1B1F",
          "surface-variant": "#E7E0EC",
          "on-surface-variant": "#49454F",
          outline: "#79747E",
          "outline-variant": "#CAC4D0",
          "surface-container-lowest": "#FFFFFF",
          "surface-container-low": "#F7F2FA",
          "surface-container": "#F3EDF7",
          "surface-container-high": "#ECE6F0",
          "surface-container-highest": "#E6E0E9",
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

