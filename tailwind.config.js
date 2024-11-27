/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  darkMode: "selector", // Use 'class' mode for toggling manually
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff4d6d",
        secondary: "#5865f2",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: ["@tailwindcss/forms"],
};
