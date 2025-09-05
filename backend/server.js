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

client.connect();
// //test the connection
client
  .query("SELECT NOW()")
  .then((res) => console.log("Database connected:", res.rows[0]))
  .catch((err) => console.error("Database connection error:", err.stack));

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
