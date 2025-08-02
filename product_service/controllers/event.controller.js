const db = require("../models");
const axios = require("axios");
const Product = db.Product;

exports.event = async (req, res) => {
  try {
    const events = req.body;

    if (events.type === "ProductStockUpdate") {
      const { productId, stock } = events.data;
      const [updated] = await Product.update(
        { stock: stock },
        {
          where: { id: productId },
        }
      );
      console.log("Product Stock Updated", events);
    }
    // await axios.post("http://localhost:4005/events");
    console.log("Event", events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
