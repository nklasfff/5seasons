/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#faf8f5',
        spring:      '#3a7040',
        summer:      '#8a2030',
        lateSummer:  '#7a6010',
        autumn:      '#505058',
        winter:      '#2a4a80',
      },
      fontFamily: {
        body:    ['Cormorant Garamond', 'Georgia', 'serif'],
        heading: ['Cinzel', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
