import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#0C0093",
        yellow: "#FDFF92",
        pink: "#FFA7A7",
        cream: "#FFF6F6",
        black: "#333333",
        gray: "#656565",
      },
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        "6xl": ["clamp(2.5rem, 8vw, 5rem)", { lineHeight: "1.1" }], // title
        "5xl": ["clamp(1.75rem, 6vw, 3.25rem)", { lineHeight: "1.3" }], // subtitle
        "4xl": ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1.2" }], // h1
        "3xl": ["clamp(1.5rem, 4vw, 2rem)", { lineHeight: "1.3" }], // h2
        "2xl": ["clamp(1.25rem, 3.5vw, 1.5rem)", { lineHeight: "1.3" }], // h3
        xl: ["clamp(1rem, 3vw, 1.25rem)", { lineHeight: "1.4" }], // h4
        lg: ["clamp(0.875rem, 2.5vw, 1rem)", { lineHeight: "1.4" }], // h5
        base: ["clamp(1rem, 2.5vw, 1.125rem)", { lineHeight: "1.75" }], // paragraph
        sm: ["clamp(0.875rem, 2vw, 1rem)", { lineHeight: "1.625" }], // subparagraph
        xs: ["clamp(0.75rem, 2vw, 0.875rem)", { letterSpacing: "0.01em" }], // tag
      },

      boxShadow: {
        soft: "2px 2px 30px rgba(51, 51, 51, 0.03)",
      },
    },
  },
  plugins: [aspectRatio],
};
