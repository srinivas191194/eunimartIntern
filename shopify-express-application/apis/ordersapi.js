const express = require("express");
const repository = require("../service/shopifyOrder");

const router = new express.Router();

router.post("/createOrder", async (req, res) => {
  let orderData = req.body;
  console.log(orderData);

  if (orderData) {
    try {
      const result = await repository.createOrder(orderData);
      res.send({ status: result });
    } catch (error) {
      res.send({ status: error });
    }
  } else {
    res.send("please enter order details");
  }
});

router.delete("/deleteOrder", async (req, res) => {
  let value = req.query.id;
  console.log(value);
  if (value) {
    try {
      const result = await repository.deleteOrder(value);
      res.send({ status: result });
    } catch (error) {
      res.send({ status: error });
    }
  } else {
    res.send("please enter order details");
  }
});

router.put("/updateOrder", async (req, res) => {
  let value1 = req.query.id;
  //   let value2 = req.body;
  if (req) {
    try {
      const result = await repository.updateOrder(req);
      res.send({ status: result });
    } catch (error) {
      res.send({ status: error });
    }
  } else {
    res.send("please enter order details");
  }
});

router.get("/countOrder", async (req, res) => {
  //   let value2 = req.body;
  try {
    const result = await repository.countOrder();
    res.send({ status: result.data });
  } catch (error) {
    res.send({ status: error });
  }
});

router.get("/getAllOrder", async (req, res) => {
  try {
    const result = await repository.getAllOrders();
    console.log(result);
    res.send({ status: result.data });
  } catch (error) {
    res.send({ status: error });
  }
});

module.exports = router;
