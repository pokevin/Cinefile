/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        poster: "27 / 40",
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        background: "rgb(var(--color-bg-primary) / <alpha-value>)",
        body: "rgb(var(--color-text) / <alpha-value>)",
        "body-secondary": "rgb(var(--color-text) / 0.6)",
      },
      boxShadow: {
        poster: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      },
    },
  },
  plugins: [],
};
