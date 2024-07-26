import animatePlugin from "tailwindcss-animate";

/** @satisfies {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      borderColor: {
        DEFAULT: "#444",
      },
      boxShadow:{
        xs: '0px 1px 2px -1px rgba(0, 0, 0, 0.1)'
      },
      width:{
        90: '22.5rem'
      },
      colors: {
        "gray": {
          300: '#898587',
          400: '#4F494C',
          500: '#2F2C2D',
          600: '#252223',
          700: '#1A1819',
          800: '#151314',
          900: '#100E0F',
        },
        "primary": {
          500: '#E74694',
          600: '#B93876',
          900: '#45152C'
        },
        'green': {
          400: '#31C48D',
          500: '#0E9F6E'
        },
        'red': {
          500: '#F05252'
        }
      },
     
    },
  },
  plugins: [animatePlugin],
};
