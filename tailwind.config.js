/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'ctr-screen': "url('/assets/ctr.png')", // Ruta hacia tu archivo ctr.png
      },
    },
  },
  plugins: [],
};
