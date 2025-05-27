/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
            DEFAULT: "#ABDD40",
        },
          black: {
            DEFAULT: "#0D0F14",
            light: "#1F2937",
            dark: "#111827",

          }
      }
    },
  },
  plugins: [],
}

