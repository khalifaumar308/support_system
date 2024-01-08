/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home_hero": "url('/src/assets/bg-hero.png')"
      }
    },
  },
  plugins: [],
}

