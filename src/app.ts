import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { product } from "./apis";
import { errorHandler } from "./utils";

const app = express();

if (!process.env.MONGODB_URI) {
  console.error("No mongo connection string. Set MONGODB_URI environment.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .catch((e) => {
    console.error("MongoDB connection error. Please make sure MongoDB is running.", e);
    process.exit(1);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/product", product);

app.use(errorHandler);

export default app;