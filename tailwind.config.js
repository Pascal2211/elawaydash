/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        backgroundWhite: "#D8E7EB",
        correctBlue: "#0D3843",
        specialWhite: "#EBEDEF",
        textBlue: "#B5CED5",
        coolBlue: "#298BA4",
        regretRed: "#E77A7A",
        kindaBlue: "#2E6877",
        objectivBlue: "#2E6877",
        boringGrey: "#81969C"
      },
    },
  },
  plugins: [],
};
