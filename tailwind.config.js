module.exports = {
  purge: ['./src/*.vue', './src/components/*.vue'],
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
