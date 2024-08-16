const mongoose = require("mongoose");
const { Schema } = mongoose;

const FAQModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    items: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FAQ = mongoose.model("faq", FAQModel);
module.exports = FAQ;
