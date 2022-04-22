const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.njk", "./src/**/*.md"],
  theme: {
    fontSize: {
      ...defaultTheme.fontSize,
      "10xl": "9rem",
      "11xl": "10rem",
      "12xl": "11rem",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.stone,
    },
    extend: {
      fontFamily: {
        sans: ["Merriweather", ...defaultTheme.fontFamily.serif],
        heading: ["Anton", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
