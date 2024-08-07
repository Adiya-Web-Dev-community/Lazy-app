const mongoose = require("mongoose");
const { Schema } = mongoose;

const InfoguideModel = new Schema(
  {
    title: { type: String, required: true },
    thumnail: { type: String, required: true },
    videourl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const InfoGuide = mongoose.model("infoguide", InfoguideModel);
module.exports = InfoGuide;
