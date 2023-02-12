const express = require("express");
const app = express();
const paypal = require("paypal-rest-sdk");
const connect = require("./configs/db");
const productsController = require("./controllers/product.controller");
const ordersController = require("./controllers/order.controller");
const port = 5544;

app.use(express.json());

app.use("/products", productsController);
app.use("/orders", ordersController);

app.listen(port, async () => {
  try {
    await connect();
    console.log("db Connected");
  } catch (err) {
    console.log(err.message);
  }

  console.log("listening on port " + port);
});
