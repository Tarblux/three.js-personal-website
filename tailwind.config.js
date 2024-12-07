import defaultTheme from 'tailwindcss/defaultTheme';

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
    },
  },
  plugins: [],
};

