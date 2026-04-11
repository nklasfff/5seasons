/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['Cinzel', 'serif'],
      },
      colors: {
        'off-white': '#faf8f5',
        heading: '#182818',
        lead: '#264028',
        muted: '#5a6a58',
        spring: '#3a7040',
        summer: '#8a2030',
        latesummer: '#7a6010',
        autumn: '#505058',
        winter: '#2a4a80',
      },
    },
  },
  plugins: [],
}
