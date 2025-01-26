module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        khmer: ['"Noto Sans Khmer"', 'sans-serif'], // Add Khmer font here
      },

    }, // Customize your theme here
  },
  plugins: [], // Add any Tailwind plugins here
};
