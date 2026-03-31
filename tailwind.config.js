/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './**/*.html',
    '!./_dev/**',
    '!./node_modules/**',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
