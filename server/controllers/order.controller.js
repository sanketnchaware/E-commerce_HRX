const express = require("express");
const router = express.Router();

const Order = require("../models/order.model");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().lean().exec();
    return res.status(200).send({ data: orders });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const order = await Order.create(req.body);

    console.log("order:", order);
    return res.status(201).send({ message: "Order Created", order });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
router.get("/:customer", (req, res) => {
  try {
    const item = find({ customer: req.params.customer }).lean().exec();
    return res.status(200).send({ data: item });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
