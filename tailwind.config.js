/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      // removed unnecessary font families
      m1: ["Merriweather", "serif"],
      m2: ["Merriweather Sans", "sans-serif"],
      helvetica: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      verdana: ["Verdana", "Arial", "Helvetica", "sans-serif"],
      sans: ['"Gandhi Sans"', "sans-serif"],
    },
    extend: {
      colors: {
        bhawaniRed: "#a41e34",
        bhawaniDark: "#98002e",
        bhawaniDark2: "#6a001f",
        bhawaniPink: "#b52651",
        bhawaniYellow: "#FDB714",
        bhawaniOrange: "#E77C22",
        bhawaniBeige: "#fff9f2",
        bhawaniGray: "#3b3b3b",
        bhawaniLight: "#e5e8eb",
        bhawaniGray2: "#dce0e6",
        bhawaniLight2: "#f1f1e3",
        bhawaniShine: "#eceef0",
        bhawaniBlue: "#68d2df",
      },
    },
    screens: {
      xs: "300px", // custom breakpoint
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
