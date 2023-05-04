// const { client } = require("../helper/redis");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const authentication = async (req, res, next) => {
  try {
    const access_token = req.cookies.access_token;
    const refresh_token = req.cookies.refresh_token;
    const decoded = await jwt.verify(access_token, process.env.access_token);
    if (decoded) {
      return next();
    }
    res.json({ error: "please login" });
  } catch (error) {
    return res.status(500).json({ error: "please login" });
  }
};

module.exports = { authentication };
