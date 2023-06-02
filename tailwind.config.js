module.exports = {
  content: ['./src/**/*.njk', './src/**/*.md',],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    styled: true,
    themes: ["retro", "dracula"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dracula"
  }
}
