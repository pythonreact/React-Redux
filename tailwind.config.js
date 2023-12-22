/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        click: {
          '0%, 100%': {
            transform: 'translateY(0px) translateX(0px)',
            '-webkit-transform': 'translateY(0px) translateX(0px)',
            boxShadow: '5px 5px 0px rgba(117,110,110,0.7)',
          },
          '50%': {
            transform: 'translateY(5px) translateX(5px)',
            '-webkit-transform': 'translateY(5px) translateX(5px)',
            boxShadow: '0px 0px 0px rgba(117,110,110,0.7)',
          },
        },
        clickOn: {
          '0%': {
            transform: 'translateY(0px) translateX(0px)',
            '-webkit-transform': 'translateY(0px) translateX(0px)',
            boxShadow: '5px 5px 0px rgba(117,110,110,0.7)',
          },
          '100%': {
            transform: 'translateY(5px) translateX(5px)',
            '-webkit-transform': 'translateY(5px) translateX(5px)',
            boxShadow: '0px 0px 0px rgba(117,110,110,0.7)',
          },
        },
        clickMobile: {
          '0%, 100%': {
            transform: 'translateY(0px) translateX(0px)',
            '-webkit-transform': 'translateY(0px) translateX(0px)',
            boxShadow: '3px 3px 0px rgba(117,110,110,0.7)',
          },
          '50%': {
            transform: 'translateY(5px) translateX(5px)',
            '-webkit-transform': 'translateY(5px) translateX(5px)',
            boxShadow: '0px 0px 0px rgba(117,110,110,0.7)',
          },
        },
        clickOnMobile: {
          '0%': {
            transform: 'translateY(0px) translateX(0px)',
            '-webkit-transform': 'translateY(0px) translateX(0px)',
            boxShadow: '3px 3px 0px rgba(117,110,110,0.7)',
          },
          '100%': {
            transform: 'translateY(5px) translateX(5px)',
            '-webkit-transform': 'translateY(5px) translateX(5px)',
            boxShadow: '0px 0px 0px rgba(117,110,110,0.7)',
          },
        },
      },
      animation: {
        click: 'click 170ms linear',
        clickOn: 'clickOn 85ms linear',
        clickMobile: 'clickMobile 170ms linear',
        clickOnMobile: 'clickOnMobile 85ms linear',
      },
    },
    screens: {
      mobile: { max: '799px' },
    },
  },
  plugins: [],
};
