/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-cycle": "slideCycle 9s infinite",
      },
      keyframes: {
        slideCycle: {
          "0%, 33.33%": { opacity: "1", transform: "translateY(0)" },
          "16.66%, 50%": { opacity: "0", transform: "translateY(-100%)" },
          "66.66%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
