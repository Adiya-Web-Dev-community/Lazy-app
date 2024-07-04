const mongoose = require("mongoose");
const FeatureSchema=new mongoose.Schema({
    category:{
        type:String
    },
    fratureHeading:{
        type:Sring,

    },
    featureValue:{
        type:String
    }
})
const companySchema=new mongoose.Schema({
    name:{type:String},
    image:{type:String}
})

const ProductSchemaModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
   images:[{type:String}],
   feature:[FeatureSchema],
   description:{type:String},
   available:{type:Boolean,
    default:true
   },
   status:{type:String,
    enum:["Active","Draft"],
    default:"Active"
   },
   productsLink:{type:String},
   company:[companySchema]

  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", ProductSchemaModel);
module.exports = Product;
