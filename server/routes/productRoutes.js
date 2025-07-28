import express from "express";
const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    // Return the first 15 products
    const products = data.products.slice(0, 10);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router;
