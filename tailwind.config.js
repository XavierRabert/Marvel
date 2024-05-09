/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        "marvel-background": "url('/assets/Background.webp')",
        "marvel-background-home": "url('/assets/Wallpaper.webp')",
        "marvel-background-home-xs": "url('/assets/Wallpaper-xs.webp')",
        "marvel-background-home-md": "url('/assets/Wallpaper-md.webp')",
      },
    },
  },
  plugins: [],
};
