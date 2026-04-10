/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A162D",
        accent: "#A3FF86",
        background: "#FFFFFF",
        dark: "#000000"
      },
      fontFamily: {
        heading: ["Raleway", "sans-serif"],
        drama: ["Raleway", "sans-serif"],
        data: ["Raleway", "sans-serif"]
      }
    },
  },
  plugins: [],
}
