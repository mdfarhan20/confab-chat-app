/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        "1": "1px"
      },
      maxWidth: {
        "90": "90vw"
      },
      width: {
        "base": "20rem"
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false,
    darkTheme: "light",  
    base: true,
    styled: true, 
    utils: true, 
    prefix: "dui-",
    logs: true,
    themeRoot: ":root", 
  },
}

