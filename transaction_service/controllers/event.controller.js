const axios = require("axios");
const db = require("../models");

exports.event = async (req, res) => {
  try {
    const events = req.body;
    if (events.type === "UserCreated") {
      const { id, name, email, password } = events.data;
      const user = await db.User.create({
        id,
        name,
        email,
        password,
      });
      console.log("User Created", user.toJSON());
    }

    if (events.type === "ProductCreated") {
      const { name, price, stock } = events.data;
      const product = await db.Product.create({
        name,
        price,
        stock,
      });
      console.log("Product Created", product.toJSON());
    }

    console.log("Event", events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
