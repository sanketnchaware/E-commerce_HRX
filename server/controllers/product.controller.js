const express = require("express");
const router = express.Router();
const Product = require("../models/products.model");

router.get("/", async (req, res) => {
  const page = +req.query.page || 1;
  const size = +req.query.size || 10;

  const skip = (page - 1) * size;

  try {
    const items = await Product.find().skip(skip).limit(size).lean().exec();
    const per_page = await Product.find()
      .skip(skip)
      .limit(size)
      .countDocuments();
    const products_count = await Product.find().countDocuments();
    const total_pages = Math.ceil(products_count / size);

    return res.status(200).send({
      data: items,
      meta: {
        products_count: products_count,
        total_pages: total_pages,
        per_page: per_page,
        current_page: page,
      },
      message: "List of all users",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const item = await Product.create(req.body);
    console.log("item:", item);
    return res.status(201).send({ message: "Product Created", item });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const item = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(201).send({ data: item, message: "product Edited" });
  } catch (err) {
    res.status().send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Product.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ data: item, message: "product Deleted" });
  } catch (err) {
    return res.status().send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Product.findById(req.params.id).lean().exec();
    return res.status(200).send({ data: item, message: "Prod by ID" });
  } catch (err) {
    return res.status().send({ message: err.message });
  }
});

module.exports = router;
