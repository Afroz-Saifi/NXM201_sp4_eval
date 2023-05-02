const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const { userRouter } = require("./routes/user.route");
const { ipRouter } = require("./routes/ip.route");
require("dotenv").config();
require("./helper/redis");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/user", userRouter);

app.use("/ip", ipRouter);
// app.use(error)

app.listen(PORT, async () => {
  try {
    // await connection;
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on port ${PORT}`);
});
