/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        secondary: "#E2231A",
        main: "#FFF",
        foreign: "#3B82F6",
        pending: "#EAB308",
        waiting: "#f97316",
        prepare: "#38bdf8",
        shipped: "#30AE9E",
        delivered: "#22C55E",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
