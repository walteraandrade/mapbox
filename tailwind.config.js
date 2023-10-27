/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        marker: `url(src/assets/mapbox-marker-icon-blue.svg)`,
      },
    },
  },
  plugins: [],
}
