const express = require("express");
const repository = require("../service/shopifyCrud");

const router = new express.Router();

router.get("/products", async (req, res) => {
  let shop = req.query.shop;
  if (shop) {
    try {
      const products = await repository.getProductsFromStore(shop);
      console.log(products.products);
      res.send(products.products);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } else {
    res.send("Enter your store");
  }
});

router.post("/createProducts", async (req, res) => {
  let shop = req.query.shop;
  let productsData = req.body;
  console.log(productsData);

  if (productsData) {
    try {
      const products = await repository.createProduct(productsData, shop);
      res.send({ status: products });
    } catch (error) {
      res.send({ status: error });
    }
  } else {
    res.send("please enter product details");
  }
});

router.put("/updateProduct", async (req, res) => {
  let shop = req.query.shop;
  let newUpdatedProductDetails = req.body;
  if (newUpdatedProductDetails) {
    try {
      const products = await repository.updateProductOnStore(
        newUpdatedProductDetails,
        shop
      );
      res.send({ status: products });
    } catch (error) {
      res.send({ status: error });
    }
  } else {
    res.send("caution you not entered details");
  }
});

router.delete("/deleteProduct", async (req, res) => {
  let shop = req.query.shop;
  let productToBeDeleted = req.query.id;
  console.log(productToBeDeleted);

  if (productToBeDeleted) {
    try {
      const products = await repository.deleteProductFromStore(
        productToBeDeleted,
        shop
      );
      res.send({ status: products.data });
    } catch (error) {
      res.send({ status: error });
    }
  } else {
    res.send("Please enter product id");
  }
});

router.get("/countProducts", async (req, res) => {
  let shop = req.query.shop;
  console.log("reached to countOfProducts");
  try {
    const responce = await repository.getCountOfProducts(shop);
    res.send({ TotalProducts: responce.data });
  } catch (error) {
    console.log(error);
    res.send({
      message1: "Please check shop name",
      message2: "Something went wrong",
    });
  }
});

router.get("/customizedGet", async (req, res) => {
  let shop = {
    shopName: req.query.shop,
    ids: req.query.ids,
    fields: req.query.fields,
  };
  console.log("reached to customizedGet");
  try {
    const responce = await repository.customizedFunction(shop);
    res.send({
      receivedResponce: responce,
    });
  } catch (error) {
    console.log(error);
    res.send({
      message1: "please check the query you passed",
      message2: "Something went wrong",
    });
  }
});

module.exports = router;
