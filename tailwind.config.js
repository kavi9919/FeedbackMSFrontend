/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
         blueGradCol1: "#02baf4",
         blueGradCol2: "#035a86"
      },
      backgroundImage: {
        'gradient-light-a': 'linear-gradient(180deg, #e6eaf5 0%, #f6f6f6 80%)',
        'gradient-light-b': 'linear-gradient(to right, #768282e6 0%, #5d8f9ce6 80%)',
        'custom-radial': 'radial-gradient(circle at center, #ffffff, #a4b6e9)', 
        'custom-radial-b': 'radial-gradient(circle at center, #ffffff, #7091e6)', 
        'top-bottom-gr': 'bg-gradient-to-b from-blue-500 to-green-500 h-64'
      },
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.25)',
        'lg': '4px 4px 8px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' }),  // default: 'standard'
    require('tailwindcss-textshadow'),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.25)',
        },
        '.text-shadow-lg': {
          'text-shadow': '4px 4px 8px rgba(0, 0, 0, 0.25)',
        },
        '.text-shadow-none': {
          'text-shadow': 'none',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
})