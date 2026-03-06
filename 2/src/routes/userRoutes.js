import express from "express";
import user from "../models/user.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, passoword } = req.body;
  if (!name || !email || !passoword) {
    res.status(400).json({
      message: "All the field is required",
    });
    return;
  }
  const isExist = await user.findOne({ email });
  if (isExist) {
    res.status(400).json({
      message: "User is already exists",
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passoword, salt);

  const newUser = await user.create({
    name,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    newUser,
    message: "User created successfully",
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({
      message: "All the field is required",
    });
    return;
  }
  const User = await user.findOne({ email });
  if (!User) {
    res.status(400).json({
      message: "user is not exist",
    });
    return;
  }

  const isPasswordMatch = await bcrypt.compare(password, User.password);
  if (!isPasswordMatch) {
    res.status(400).json({
      message: "password is not correct",
    });
    return;
  }

  const token = jwt.sign({ id: User._id }, "55c02c065977fbb9dfd4bd469dbb3a95");

  res.status(200).json({
    token,
    message: "User login successfully",
  });
});

export default router;
