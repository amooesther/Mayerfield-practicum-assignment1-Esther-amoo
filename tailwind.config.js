/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: '#101010',
        card: '#1c1c1c',
        'card-alt': '#222222',
        border: '#282828',
        accent: '#c8ff00',
        'text-primary': '#ffffff',
        'text-secondary': '#c9cdd4',
        'text-muted': '#8e949e',
        divider: '#222222',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
