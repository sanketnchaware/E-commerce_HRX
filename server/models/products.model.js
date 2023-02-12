const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number },
    price: { type: Number, required: true },
  },
  { versionKey: false },
  { timeStamps: true }
);

const Product = mongoose.model("product", productsSchema);

module.exports = Product;
