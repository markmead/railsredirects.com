module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/*.vue', './src/components/*.vue'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
}
