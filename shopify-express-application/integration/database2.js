const Store = require("../models/orders");

async function addNewOrder(data) {
  const newOrder = new Store(data);
  try {
    await newOrder.save();
    return { status: 200 };
  } catch (error) {
    console.log(error);
    return { status: 400 };
  }
}

module.exports = { addNewOrder };
