/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // minWidth: {
    //   700: "700px",
    //   900: "900px",
    //   950: "950px"
    // },
    // maxHeight: {
    //   18: "4.5rem",
    // },
    fontFamily: {
      signature: ["Cedarville+Cursive", "sans-serif"],
    },
    container: {
      center: true,
      padding: "22rem",
    },
    extend: {
      colors: {
        primary: { DEFAULT: "#0055FF", 600: "#2563EB" },
        secondary: "#0B0A1F",
      },
    },
  },
  plugins: [],
};
