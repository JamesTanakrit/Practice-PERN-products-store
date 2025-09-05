import client from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const response = await client.query(`
      SELECT * FROM products 
      ORDER BY created_at DESC
    `);
    const data = response.rows;

    console.log("fetched products:", data);
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error in getAllProducts function", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  try {
    const response = await client.query(`
      INSERT INTO products (name, price, image)
      VALUES (${name},${price},${image})
      RETURNING *
    `);
    const newProduct = response.rows;
    console.log("new product added:", newProduct[0]);
    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.error("Error in createProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await client.query(`
      SELECT * FROM products
      WHERE id=${id}
    `);
    const product = response.rows;
    res.status(201).json({ success: true, data: product[0] });
  } catch (error) {
    console.error("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  try {
    const response = await client.query(`
      UPDATE products
      SET name=${name}, price=${price}, image=${image}
      WHERE id=${id}
      RETURNING *
    `);
    const updatedProduct = response.rows;

    if (updatedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(201).json({ success: true, data: updatedProduct[0] });
  } catch (error) {
    console.error("Error in updateProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await client.query(`
      DELETE FROM products
      WHERE id=${id}
      RETURNING *
    `);

    const deletedProduct = response.rows;

    if (deletedProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(201).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.error("Error in deleteProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
