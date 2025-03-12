/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        intero: ["Intero", "sans-serif"],
        sf: ["SFRegular", "sans-serif"],
        sfbold: ["SFProBold", "sans-serif"],
        sfmedium: ["SFProMedium", "sans-serif"],
      }
    },
  },
  plugins: [],
}