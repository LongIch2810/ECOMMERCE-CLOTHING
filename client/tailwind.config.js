/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#afe8a2",
        secondary: "#e2231a",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
