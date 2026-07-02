/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This maps 'font-karla' to your local CSS font-family name
        karla: ['Karla', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}