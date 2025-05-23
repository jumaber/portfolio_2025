export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  safelist: [
    "pl-6",
    "pb-4",
    "pt-4",
    "text-base",
    "font-normal",
    "leading-9",
    "font-inter",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
