import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const { Schema } = mongoose;

const empSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  last_name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    validate: [isEmail, "Invalid Email"],
    maxLength: 50,
  },
  gender: {
    type: String,
    unique: true,
    maxLength: 25,
    enum: ["Male", "Female", "Other"],
  },
  salary: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("employees", empSchema);
