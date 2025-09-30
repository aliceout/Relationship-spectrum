export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#6C5CE7",
        accent: "#00B894",
        warn: "#FF7675",
        ink: {
          DEFAULT: "rgb(var(--color-ink) / <alpha-value>)",
          secondary: "rgb(var(--color-ink-secondary) / <alpha-value>)"
        },
        bg: {
          DEFAULT: "rgb(var(--color-bg) / <alpha-value>)",
          card: "rgb(var(--color-bg-card) / <alpha-value>)"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}
