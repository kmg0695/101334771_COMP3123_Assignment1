import { Router } from "express";
import { config } from "dotenv";
import UserModel from "../models/users.js";
import isEmail from "validator/lib/isEmail.js";

const routes = Router();

config();

routes.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!req.body) {
    return res.status(400).send({
      status: false,
      message: "Please enter user details",
      date: Date(),
    });
  }
  if (!username) {
    return res.status(400).send({
      status: false,
      message: "Please enter username",
      date: Date(),
    });
  }
  if (!email) {
    return res.status(400).send({
      status: false,
      message: "Please enter email",
      date: Date(),
    });
  }
  if (!isEmail(email)) {
    // gate check email validation
    return res.status(400).send({
      status: false,
      message: "Please check email details (username@domain.org)",
      date: Date(),
    });
  }
  if (!password) {
    return res.status(400).send({
      status: false,
      message: "Please enter your password",
      date: Date(),
    });
  }

  if (await UserModel.findOne({ email: email })) {
    return res.status(400).send({
      status: false,
      message: "Email must be unique",
      date: Date(),
    });
  }
  try {
    const newUser = new UserModel(req.body);

    newUser.save();

    return res.status(201).send({
      status: true,
      message: "User Registered successfully!",
      date: Date(),
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      error,
      date: Date(),
    });
  }
});

routes.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!req.body || req.body == null) {
    return res.status(400).send({
      status: false,
      message: "Please enter user details",
      date: Date(),
    });
  }
  if (!username || username == null) {
    return res.status(400).send({
      status: false,
      message: "Please enter username",
      date: Date(),
    });
  }
  if (!password || password == null) {
    return res.status(400).send({
      status: false,
      message: "Please enter your password",
      date: Date(),
    });
  }

  const foundUser = await UserModel.findOne({ username: username });

  if (!foundUser) {
    return res.status(400).send({
      status: false,
      message: "Username not found",
      date: Date(),
    });
  }

  const foundPassword = foundUser.verifyPass(req.body.password); // API call

  if (!foundPassword) {
    return res.status(400).send({
      status: false,
      message: "Invalid password",
      date: Date(),
    });
  }

  return res.status(200).send({
    status: true,
    username,
    message: `${username} logged in successfully`,
    date: Date(),
  });
});

export default routes;
