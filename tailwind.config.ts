import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        royal: "#0074D9",
        deep: "#001f3f",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(0,116,217,0.22), 0 10px 40px rgba(0,31,63,0.45)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"],
      },
    },
  },
  plugins: [],
} satisfies Config;
