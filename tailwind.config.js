const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrainsMono", "menlo", ...defaultTheme.fontFamily.mono],
        archivosemi: ["Archivo_SemiExpanded"],
      },
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
