/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8fa0ff",
        primaryHover: "#8190e6",
        primaryActive: "#7280cc",
        dark: "#6b78bf",
        light: "#f4f6ff",
        title: "#46505A",
      },
      backgroundImage: {
        backgroundImage: "url('/public/images/background.webp')",
        rock: "url('/public/images/Rock.png')",
        scissors: "url('/public/images/Scissors.png')",
        paper: "url('/public/images/Paper.png')",
        rsp: "url('/public/images/rsp.png')",
      },
    },
  },
  plugins: [],
};
