const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  img_url: String,
  ingredients: {
    type: [String],
    required: true,
  },
  texture: String,
  price_range: String,
  skin_type: [String],
  has_fragrance: Boolean,
  has_alcohol: Boolean,
  is_waterproof: Boolean, // sunscreen or moisturizer w/ sunscreen
  is_tinted: Boolean, // sunscreen or moisturizer w/ sunscreen
  removes_makeup: Boolean, // cleanser
  spf: Number, // sunscreen or moisturizer w/ sunscreen
  sunscreen_type: [String], // sunscreen or moisturizer w/ sunscreen
  category: {
    type: String,
    required: true,
  },
  is_clean: Boolean,
  skin_concerns: [String],
  buy_link: {
    type: String,
    required: true,
  },
});

// create a collection called 'sunscreens' whose documents will look like productSchema
module.exports = mongoose.models.Product || model("Product", productSchema);
