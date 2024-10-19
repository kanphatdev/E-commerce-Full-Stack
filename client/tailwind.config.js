/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          
"primary": "#d600ff",
          
"secondary": "#00f4b0",
          
"accent": "#008700",
          
"neutral": "#111006",
          
"base-100": "#142c1f",
          
"info": "#00bdff",
          
"success": "#008845",
          
"warning": "#fec600",
          
"error": "#f75363",
          },
        },
      ],
    },
  plugins: [
    require('daisyui'),
  ],
}