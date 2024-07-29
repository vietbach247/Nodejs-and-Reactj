import express from "express";
import mongoose from "mongoose";
import router from "./router";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import dotenv from "dotenv";

import cors from "cors";

// Cấu hình dotenv
dotenv.config();

// Tạo instance của express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Khai báo PORT
const PORT = 8000;

// Kết nối MongoDB
mongoose
  .connect("mongodb://localhost:27017/api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Sử dụng router cho các route
app.use("/api", router);

// Xử lý lỗi
app.use(errorHandler);
app.use(notFound);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
