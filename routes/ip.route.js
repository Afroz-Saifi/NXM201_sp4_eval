const { client } = require("../helper/redis");
const express = require("express");
const axios = require("axios");
const { authentication } = require("../middleware/auth");

const ipRouter = express.Router();

ipRouter.get("/info/:ipAddress", authentication, async (req, res) => {
  try {
    const ipInfo = await axios.get(
      `https://ipapi.co/${req.params.ipAddress}/json/`
    );

    // await client.set(email, refresh_token);

    return res.json({data: ipInfo.data});
    // const access_token = await client.get("access_token");
    // console.log(access_token);
    // const access_token = req.cookies.access_token;
    // const refresh_token = req.cookies.refresh_token;
    // return res.json({ access_token });
  } catch (error) {
    return res.status(500).json(error);
  }
});

ipRouter.get(
  "/current_location/:ipAddress",
  authentication,
  async (req, res) => {
    try {
      const ipInfo = await axios.get(
        `https://ipapi.co/${req.params.ipAddress}/city/`
      );

      return res.send(ipInfo.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

module.exports = { ipRouter };
