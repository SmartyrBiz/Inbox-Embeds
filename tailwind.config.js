/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "sr-",
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"],
      },
      width: {
        xl: "640px",
        lg: "420px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
