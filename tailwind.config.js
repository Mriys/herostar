/**** Tailwind Config ****/
/** Do not remove comments **/
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#FFD000',
        background: '#0a0a0a',
        foreground: '#ffffff',
        muted: '#111111',
        border: '#222222'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.2)'
      }
    },
  },
  plugins: [],
}
