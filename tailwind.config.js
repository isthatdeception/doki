module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fill: (theme) => ({
      red: theme("colors.red.primary"),
    }),
    extend: {
      colors: {
        white: "#ffffff",
        blue: {
          medium: "#005c98",
        },
        black: {
          faded: "#000000",
          light: "#262626",
          hard: "",
        },
        gray: {
          base: "#616161",
          background: "#fafafa",
          primary: "#dbdbdb",
        },
        red: {
          primary: "#ed4956",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  future: {
    removeDepreceatedGapUtilities: true,
  },
};
