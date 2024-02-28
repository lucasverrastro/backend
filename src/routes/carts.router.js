const express = require("express");
const router = express.Router();
const CartManagerDb = require("../controller/cartManagerDb");
const cartManagerDb = new CartManagerDb();

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManagerDb.createCart();
    res.json({ message: `Cart created with id ${newCart._id}` });
  } catch (err) {
    res.status(500).json({ message: "Server problems" });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManagerDb.getCartById(cid);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: `Cart with id ${cid} not found` });
    }
  } catch (err) {
    res.status(500).json({ message: "Server problems" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    if (cid && pid) {
      const status = await cartManagerDb.addToCart(cid, pid);
      res.status(200).json({messsage: status})
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;