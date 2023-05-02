const { createClient } = require("redis");

const client = createClient();

client.on("connection", () => console.log("connected to redis"));

client.on("error", (err) => {
  console.log("Redis Client Error", err);
});

client.on("disconnect", () => console.log("redis client disconnected"));

client.connect();

module.exports = { client };    
