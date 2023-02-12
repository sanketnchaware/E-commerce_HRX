const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const ordersSchema = new mongoose.Schema(
  {
    customer: { type: Number, required: true },
    items: [
      {
        image: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { versionKey: false },
  { timeStamps: true }
);

const Order = mongoose.model("order", ordersSchema);

module.exports = Order;
