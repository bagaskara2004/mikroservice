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
      const { id, name, price, stock } = events.data;
      const product = await db.Product.create({
        id,
        name,
        price,
        stock,
      });
      console.log("Product Created", product.toJSON());
    }

    if (events.type === "ProductUpdated") {
      const product = await db.Product.update(req.body.data.data, {
        where: { id: req.body.data.id },
      });
      console.log("Product Updated", req.body.data);
    }

    if (events.type === "UserUpdated") {
      const user = await db.User.update(req.body.data.data, {
        where: { id: req.body.data.id },
      });
      console.log("User Updated", req.body.data);
    }

    console.log("Event", events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
