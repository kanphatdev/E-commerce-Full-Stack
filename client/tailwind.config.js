/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  plugins: [
    require('daisyui'),
  ],

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#cf00e8",
          "secondary": "#009400",
          "accent": "#00b1ff",
          "neutral": "#321b05",
          "base-100": "#1b2609",
          "info": "#0069ff",
          "success": "#00f4ab",
          "warning": "#ff9700",
          "error": "#ff4151",
        },
      },
      "light", // other built-in DaisyUI themes if needed
      "dark",
    ],
  },
}
