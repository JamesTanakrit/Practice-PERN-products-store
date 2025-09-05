import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import productRouter from "./routes/products.route.js";
import client from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Middleware
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging requests

app.use("/api/products", productRouter);

async function initDB() {
  try {
    await client.connect();
    client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Connected to PostgreSQL database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize the database:", error);
    process.exit(1);
  });
