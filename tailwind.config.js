/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--background-color-accent)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
