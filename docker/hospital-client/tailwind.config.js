/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      signature: ["Cedarville+Cursive", "sans-serif"],
    },
    container: {
      center: true,
      padding: "22rem",
    },
    extend: {
      colors: {
        primary: "#0055FF",
        secondary: "#0B0A1F",
      },
    },
  },
  plugins: [],
};
