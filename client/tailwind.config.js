/** @type {import('tailwindcss').Config} */
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
  plugins: [],
}

