/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#F8B21D',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        cursive: ['Courgette', 'cursive'],
      },
    },
  },
  plugins: [],
}
