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
        customProduct: "40px 1.4fr 1.4fr 1fr  0.8fr 1fr 1fr 0.8fr",
        customCategorySingleProduct: "40px 1.4fr 1.4fr 1fr  0.8fr 1fr 1fr",
        customeCategory: "40px 0.8fr 2fr  0.6fr 0.6fr",
        customCategoryProduct:
          "40px 1fr 0.8fr 1fr 1.4fr 2fr 180px 0.8fr 0.8fr  ",
        customCompanies: "40px 1.4fr 1fr 1.6fr 1fr 2fr 1fr 1fr 1fr 0.8fr ",
        customeBlogCategory: "40px 0.8fr 2fr  0.6fr",
        customBlog: "40px  1.2fr 1.6fr 1fr 2fr 1fr 0.8fr",
        customReviewBlog: "40px  1.2fr 1.6fr 1.6fr 1fr  0.8fr",
        customInfoGuide: "40px  1.2fr 1.6fr 1.6fr  0.8fr",
        customFaq: "40px  1fr 1fr 0.8fr  0.8fr",
        customFaqProfile: "40px  1fr 1fr",
        customeProsCons: "40px 1fr 1fr 1fr 0.6fr",
        customePostCategory: "40px  2fr  0.6fr",
        customePostTransaction:
          "40px  1fr 1fr 1fr 1.6fr 1.6fr 1.6fr 2.4fr 1.6fr 0.6fr",
        customePostClaim: "40px  1.2fr 1.6fr  1.6fr 1fr  1.4fr 1.6fr  0.6fr",
        customeUsers: "40px  1.2fr 1.6fr  1.6fr 1fr 1.6fr 1.4fr 1.6fr  0.6fr",
        customeHistory: "40px  1.2fr 1.6fr  1.6fr 1fr 1.6fr 1.4fr 1.6fr  0.6fr",
      },
    },
  },
  plugins: [],
};
