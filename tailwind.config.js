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
        title: ["clamp(2.5rem, 8vw, 5rem)", { lineHeight: "1.1" }],
        subtitle: [
          "clamp(1.75rem, 6vw, 3.25rem)",
          { lineHeight: "clamp(2.5rem, 8vw, 3.75rem)" },
        ],
        h1: ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1.2" }],
        h2: ["clamp(1.25rem, 3.5vw, 1.5rem)", { lineHeight: "1.3" }],
        h3: ["clamp(1.25rem, 3.5vw, 1.5rem)", { lineHeight: "1.3" }],
        h4: ["clamp(1rem, 3vw, 1.25rem)", { lineHeight: "1.4" }],
        h5: ["clamp(0.875rem, 2.5vw, 1rem)", { lineHeight: "1.4" }],
        paragraph: [
          "clamp(1rem, 2.5vw, 1.125rem)",
          { lineHeight: "clamp(1.75rem, 5vw, 2.25rem)" },
        ],
        subparagraph: ["clamp(1rem, 2.5vw, 1.125rem)", { lineHeight: "1.625" }],
        tag: ["clamp(0.75rem, 2vw, 0.875rem)", { letterSpacing: "0.01em" }],
      },
      boxShadow: {
        soft: "2px 2px 30px rgba(51, 51, 51, 0.03)",
      },
    },
  },
  plugins: [],
};
