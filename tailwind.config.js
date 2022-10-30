const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{njk,md}"],
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
      slate: colors.slate,
      blue: colors.sky,
      cyan: colors.cyan,
      amber: colors.amber,
      red: colors.red,
    },
    extend: {
      screens: {
        canDisplayA4: { raw: "(min-width: 875px)" },
      },
      fontFamily: {
        serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
        heading: ["Anton", ...defaultTheme.fontFamily.sans],
        space: ["Space Mono", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h2: {
              marginTop: `1.5rem`,
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
