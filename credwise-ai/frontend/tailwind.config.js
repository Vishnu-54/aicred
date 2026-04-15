/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#161b1d',
        cloud: '#f6f8f7',
        mint: '#00a676',
        reef: '#0e7c7b',
        coral: '#e85d4f',
        gold: '#d69e2e'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(22, 27, 29, 0.10)'
      }
    }
  },
  plugins: []
};
