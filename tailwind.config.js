/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#264796",
        "light-white": "rgba(255,255,255,0.17)",
        "yellow-dark": "#AC885A",
        "light-yellow": "#e0d3c2",
        "light-bag": "#e7ddcf",
        "Slate-color": "#f8fafc",
        "blue-light": "#ebeffa",
        "blue-lightest": "#f6f3ee",
        "my-Light-blue": "#7190db",
        "my-light-golden": "#d4c2aa",
      },
    },
  },
  plugins: [],
};
