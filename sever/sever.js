import express from "express";
import mongoose from "mongoose";
import router from "./router";
import { errorHandler, notFound } from "./middleware/errorHandler";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

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

app.use("/api", router);

app.use(errorHandler);

app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server on port : http://localhost:${PORT}`);
});
