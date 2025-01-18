/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#ffc400",
        pastelBlue: "#BAE6FD", // azul pastel
      },
      fontFamily: {
        cursiva: ["'Great Vibes'", "cursive"], // Ejemplo de fuente cursiva
        body: ['"Merriweather"', "serif"],
      },
      backgroundImage: {
        'roses-pattern': "url('/images/cenicienta.webp')",
      },
    },
  },
  plugins: [],
};
