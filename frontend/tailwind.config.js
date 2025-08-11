/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      height: {
        100: '30rem',
      },
      colors: {
        main: '#183253',
        subMain: '#66B5A3',
        text: '#F2FAF8',
        border: '#E8EBEE',
        textGray: '#A0A0A0',
        dry: '#F8F9FA',
        greyed: '#F3F5F7',
        required: '#FF0000',
        warn: '#FFD700',
      },
    },
  },
  plugins: [],
};
