/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gemini-dark': '#0f0f23',
        'gemini-darker': '#0a0a1a',
        'gemini-accent': '#4285f4',
        'gemini-text': '#e8eaed',
        'gemini-text-secondary': '#9aa0a6',
        'gemini-border': '#3c4043',
        'gemini-hover': '#1a1a2e',
      },
      animation: {
        'typing': 'typing 1.5s steps(40, end)',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          '0%, 50%': { 'border-color': 'transparent' },
          '51%, 100%': { 'border-color': '#4285f4' },
        },
      },
    },
  },
  plugins: [],
}
