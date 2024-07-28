/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        primary_dark: '#fad9b7',
        primary_light: '#087f63',
        secondary_light: '#087f6338',
        secondary_dark: '#fad8b772',
        accent: '#eceef0',
        dark: '#111111',
        lightDark: '#43434616',
        light: '#efefef',
        dark_canvas: '#1a1a1a',
        light_canvas: '#ffffff'
      }
    },
    fontFamily: {
      'lexend':['Lexend', 'sans'],
      'quicksand': ['Quicksand','sans']
    }
  },
  plugins: [
    require('duo-icons/plugin'),
  ],
}

