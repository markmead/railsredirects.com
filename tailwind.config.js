module.exports = {
  purge: [],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
