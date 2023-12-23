/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        background: "rgb(var(--color-bg-primary) / <alpha-value>)",
        body: "rgb(var(--color-text) / <alpha-value>)",
        "body-secondary": "rgb(var(--color-text) / 0.6)",
      },
    },
  },
  plugins: [],
};
