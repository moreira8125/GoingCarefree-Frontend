/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        customSize: "10rem",
      },
      colors: {
        navbar_color: "#072439",
        video_color: "#001628",
        navlink_color: "#858585",
      },
      width: {
        w_custom: "40em",
      },
      borderRadius: {
        customRadius: "2em",
      },
    },
  },
  plugins: [],
};
