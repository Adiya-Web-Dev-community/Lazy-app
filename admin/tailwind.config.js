/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
        // Add more font families as needed
        lato: ["Lato", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      gridTemplateColumns: {
        // custom: "40px repeat(6, 1fr)",
        // customDashboard: "40px 2.6fr 1.4fr  1.4fr 2fr 1fr 1fr 1fr 1fr 1fr",
        // customDashboard: "40px repeat(7, 1fr)",
        // customProduct: "40px repeat(7, 1fr)",
        customProduct: "40px 1.4fr 1.4fr 1fr 0.8fr 1fr 0.8fr 1fr 1fr 0.8fr",

        customCategoryProduct:
          "40px 1fr 0.8fr 1fr 1.4fr 2fr 180px 0.8fr 0.8fr  ",

        customCompanies: "40px 1.4fr 1fr 1.6fr 1fr 2fr 1fr 1fr 1fr 0.8fr ",

        customBlog: "40px  1.2fr 1.6fr 2.2fr 1.4fr 0.6fr 1fr 1fr 1.4fr 0.6fr",

        customeCategory: "40px 2fr  0.6fr",
      },
    },
  },
  plugins: [],
};
