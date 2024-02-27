/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {fontSize:{
      customSize: "10rem"
    },
      colors: {
        navbar_color: "#072439",
      },
    },
  },
  plugins: [],
};
