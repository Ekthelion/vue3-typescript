module.exports = {
  purge: ["./public/**/*.html", "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled", "hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
