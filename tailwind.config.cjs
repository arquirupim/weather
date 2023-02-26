/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
    },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  important: '#root',
  theme: {
    extend: {
      maxHeight : {
        'rounded_full' : '75%'
      },
      maxWidth : {
        'rounded_full' : '75%'
      }
    },
  },
  plugins: [],
}
