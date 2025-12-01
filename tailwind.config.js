/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        poppins: ['Outfit', 'sans-serif'], // Keep for backward compatibility if needed, but map to Outfit
      },
      colors: {
        primary: '#6366f1',
        secondary: '#3b82f6',
        accent: '#2dd4bf',
        'dark-bg': '#111827',
        'dark-card': '#1f2937',
      }
    },
  },
  plugins: [],
}

