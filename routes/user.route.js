const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
const { client } = require("../helper/redis");

const userRouter = express.Router();

// register new user
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const isUserAlready = await User.findOne({ email });
    if (isUserAlready) {
      throw new Error("user is already present");
    }
    const hashPass = bcrypt.hashSync(password, 8);
    const newUserData = new User({ name, email, password: hashPass });
    await newUserData.save();
    return res
      .status(201)
      .json({ message: "new user has registered successfully" });
  } catch (error) {
    // throw Error(error);
    res.status(500).json({ error });
  }
});

// login user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await User.findOne({ email });
    if (!isUser) {
      //   throw new Error("user is not present");
      return res.status(400).json({ error: "wrong crediencials" });
    }
    const match = await bcrypt.compare(password, isUser.password);
    if (match) {
      const access_token = jwt.sign({ email }, process.env.access_token, {
        expiresIn: "1h",
      });
      const refresh_token = jwt.sign({ email }, process.env.refresh_token, {
        expiresIn: "5d",
      });
      //   await client.set(`${email}_access_token`, access_token);
      //   await client.set(`${email}_refresh_token`, refresh_token);
      res.cookie("access_token", access_token);
      res.cookie("refresh_token", refresh_token);
      return res
        .status(200)
        .json({ msg: "login success", access_token, refresh_token });
    } else {
      return res.status(400).json({ error: "wrong crediencials" });
    }
  } catch (error) {
    // throw Error(error);
    res.status(500).json({ error });
  }
});

// user logout route
userRouter.get("/logout", async (req, res) => {});

module.exports = { userRouter };
