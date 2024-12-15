/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "540px",
      lg: "1080px",
      xl: "1440px",
      "sm-tablet": "480px",
      "lg-tablet": "680px",
      desktop: "1000px",
    },
  },
  plugins: [],
};
