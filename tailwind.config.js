export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      colors: {
        brand: "#6C5CE7",
        accent: "#00B894",
        warn: "#FF7675",
        ink: {
          DEFAULT: "#1F2937",
          secondary: "#4B5563"
        },
        bg: {
          DEFAULT: "#F9FAFB",
          card: "#FFFFFF"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}
