module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        blue: {
          medium: "#47597E",
        },
        black: {
          faded: "#000000",
          light: "#005c98",
          hard: "",
        },
        gray: {
          primary: "#616161",
          background: "#fafafa",
          hard: "#dbdbdb",
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
