/* tailwind.config.js */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./assets/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    // mirrors tokens.ts spacing
    spacing: {
      0:  "0px",
      1:  "4px",
      2:  "8px",
      3:  "12px",
      4:  "16px",
      5:  "20px",
      6:  "24px",
      8:  "32px",
      10: "40px",
      12: "48px",
      14: "56px",
      16: "64px",
    },
    // mirrors tokens.ts radius
    borderRadius: {
      lg:    "16px",
      xl:    "20px",
      "2xl": "24px",
      full:  "9999px",
    },
    // mirrors tokens.ts textStyles font sizes
    fontSize: {
      sm:    ["12px", { lineHeight: "18px" }], // description, value
      md:    ["14px", { lineHeight: "20px" }], // subtitle
      lg:    ["20px", { lineHeight: "26px" }], // label
      "2xl": ["24px", { lineHeight: "30px" }], // title, heading, button
    },
    // mirrors tokens.ts font.family
    fontFamily: {
      light:    ["LeagueSpartan-Light"],
      regular:  ["LeagueSpartan-Regular"],
      medium:   ["LeagueSpartan-Medium"],
      semibold: ["LeagueSpartan-SemiBold"],
      bold:     ["LeagueSpartan-Bold"],
    },
    extend: {
      // mirrors tokens.ts colors
      colors: {
        primary:   "#2260FF",
        secondary: "#809CFF",
        tertiary:  "#CAD6FF",
        muted:     "#ECF1FF",
        white:     "#FFFFFF",
        ink:       "#070707",
      },
    },
  },
  plugins: [],
};
