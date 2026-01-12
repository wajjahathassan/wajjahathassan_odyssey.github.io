
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'asan-gold': '#D4AF37', // Historical gold
        'asan-green': '#4A5D4F', // Pine/Nature
        'asan-red': '#8B3A3A',   // Shrine wood
        'paper': '#F5F5F0',      // Hanji paper
        'dark-slate': '#2C2C2C', // Ink
      },
      fontFamily: {
        'serif': ['"Noto Serif KR"', 'serif'],
        'sans': ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'pattern': "url('https://www.transparenttextures.com/patterns/rice-paper-2.png')", 
      }
    },
  },
  plugins: [],
}
