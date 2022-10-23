/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";
import empRoutes from "./routes/employees.js";

const app = express();
dotenv.config();

app.use(json());
app.use(urlencoded({ extended: true }));

const DB_CONNECT_STRING = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@book.tsm7ref.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(DB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.use("/api/user", userRoutes);
app.use("/api/emp", empRoutes);

app.route("/").get((req, res) => {
  res.send("<h1>Assignment 1 - 101334771</h1>");
});

app.listen(process.env.SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server is running at http://localhost:${process.env.SERVER_PORT}`
  );
});
