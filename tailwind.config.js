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
        // Theme tokens — driven by CSS vars so they swap in dark mode
        'off-white': 'var(--bg)',
        surface: 'var(--surface)',
        body: 'var(--text)',
        heading: 'var(--heading)',
        lead: 'var(--lead)',
        muted: 'var(--muted)',
        // Season accents (stay the same in dark mode)
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
