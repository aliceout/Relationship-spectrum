export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#F36BA4",
        accent: "#7B6CF6",
        warn: "#FF8B64",
        glow: "#6FD0C1",
        blush: "#FDE5EC",
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
        sans: ["Poppins", "Inter", "sans-serif"],
        display: ["Playfair Display", "serif"]
      }
    }
  },
  plugins: []
}
