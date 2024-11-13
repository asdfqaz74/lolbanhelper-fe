/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      statslg: "1460px",
      dblg: "1200px",
      stats: "1200px",
      db: "830px",
      statsmd: "860px",
      md: "768px",
      statssm: "580px",
      dbsm: "432px",
    },
    extend: {
      translate: {
        step1: "0%",
        step2: "-100%",
        step3: "-200%",
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(360deg)" },
        },
      },
      animation: {
        flip: "flip 1s ease",
      },
      transformOrigin: {
        transformstyle3d: "preserve-3d",
      },
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
