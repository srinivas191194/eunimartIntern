const client = require("../integration/database2");

async function addOrder(newOrder) {
  let res = await client.addNewOrder(newOrder);
  console.log("client status", res);
  return res;
}

module.exports = { addOrder };
