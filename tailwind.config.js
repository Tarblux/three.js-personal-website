import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist Sans', ...defaultTheme.fontFamily.sans], // Overrides default sans
        geist: ['Geist Sans', 'sans-serif'], // Adds new custom geist font
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' }
        },
        idCardGloss: {
          '0%': { backgroundPosition: '150% center' },
          '100%': { backgroundPosition: '-50% center' }
        },
        unfold: {
          '0%': { 
            transform: 'perspective(2000px) rotateX(90deg) scale(0.7)',
            opacity: '0'
          },
          '70%': {
            transform: 'perspective(2000px) rotateX(-10deg) scale(1.05)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'perspective(2000px) rotateX(0deg) scale(1)',
            opacity: '1'
          }
        },
        fold: {
          '0%': { 
            transform: 'perspective(2000px) rotateX(0deg) scale(1)',
            opacity: '1'
          },
          '30%': {
            transform: 'perspective(2000px) rotateX(-10deg) scale(1.05)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'perspective(2000px) rotateX(90deg) scale(0.7)',
            opacity: '0'
          }
        },
        modalIn: {
          '0%': { 
            transform: 'translateY(100%) scale(0.95)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0) scale(1)',
            opacity: '1'
          }
        },
        modalOut: {
          '0%': { 
            transform: 'translateY(0) scale(1)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateY(100%) scale(0.95)',
            opacity: '0'
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        'slideUp': 'slideUp 0.5s ease-out forwards',
        'unfold': 'unfold 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'fold': 'fold 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'idCardGloss': 'idCardGloss 1s linear',
        'modalIn': 'modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'modalOut': 'modalOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      },
      backgroundImage: {
        'id-card-gloss': 'linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0.25) 60%, transparent 80%)',
      },
      backgroundSize: {
        'id-card-gloss': '200% 100%',
      },
      backgroundPosition: {
        'id-card-gloss': '150% center',
      },
    },
  },
  plugins: [],
};

