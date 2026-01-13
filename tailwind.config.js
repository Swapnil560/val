/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A84FF",
        "background-light": "#F8FAFC",
        "surface-light": "#FFFFFF",
        "subtle-light": "#F0F5FA",
        "text-light": "#334155",
        "heading-light": "#0F172A",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
      },
    },
  },
  plugins: [],
}