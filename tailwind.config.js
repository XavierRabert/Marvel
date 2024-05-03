/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "marvel-background": "url('/assets/Background.webp')",
      },
    },
  },
  plugins: [],
};
