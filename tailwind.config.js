/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo-600 (Professional Blue)
        secondary: '#10B981', // Emerald-500 (Wellness Green)
        dark: '#1F2937',
        light: '#F3F4F6'
      }
    },
  },
  plugins: [],
}