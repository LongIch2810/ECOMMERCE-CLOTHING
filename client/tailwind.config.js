/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        secondary: "#e2231a",
        main: "#fff",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
