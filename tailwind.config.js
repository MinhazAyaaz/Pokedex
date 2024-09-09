/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'identity-primary': '#FF0000',
        'grayscale-dark': '#212121',
        'grayscale-medium': '#666666',
        'grayscale-light': '#e0e0e0',
        'grayscale-background': '#efefef',
        'grayscale-white': '#ffffff',
      },
      fontSize: {
        'headline': '24px',
        'body1': '14px',
        'body2': '12px',
        'body3': '10px',
        'subtitle1': '14px',
        'subtitle2': '12px',
        'subtitle3': '10px',
        'caption': '8px',
      },
      lineHeight: {
        'headline': '32px',
        'common': '16px',
        'caption': '12px',
      },
      fontWeight: {
        'regularNew': 400,
        'boldNew': 700,
      },
      boxShadow: {
        'drop': '0px 1px 3px 1px rgba(0, 0, 0, 0.2)',
        'drop-hover': '0px 3px 12px 3px rgba(0, 0, 0, 0.2)',
        'drop-inner': '0px 1px 3px 1px rgba(0, 0, 0, 0.25) inset',
      },
    },
  },
  plugins: [],
}