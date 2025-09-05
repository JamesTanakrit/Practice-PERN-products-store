import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import productRouter from "./routes/products.route.js";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Middleware
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging requests

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
