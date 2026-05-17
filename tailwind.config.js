/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        fusion: {
          dark: '#050816',
          red: '#E60000',
          yellow: '#FFCC00',
          blue: '#0099FF',
          orange: '#FF9900',
          purple: '#9933FF',
        },
      },
    },
  },
  plugins: [],
};
