/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tpb-green': '#5ac59a',
        'tpb-orange': '#e58351',
        'tpb-dark': '#181818',
        'tpb-slate': '#64748b',
        'tpb-blue': '#3b82f6',
      },
      fontFamily: {
        'muli': ['Muli', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
