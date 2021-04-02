const express = require("express");
const serviceObject = require("../service/bigCommerceCrud");
const indexObject = require("./index");
const router = new express.Router();

router.get("/getproducts", async (req, res) => {
  let hashvalue = req.query.hash;
  // console.log("In bigcommerce" + hashvalue);
  if (hashvalue) {
    try {
      const products = await serviceObject.getProductsFromStore(hashvalue);
      // console.log(products);
      res.send(products);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } else {
    res.send("Enter your store hash");
  }
});

router.post("/createProducts", async (req, res) => {
  let hashvalue = req.query.hash;
  let productsData = req.body;
  console.log(productsData);
  if (hashvalue) {
    try {
      const products = await serviceObject.createProduct(
        productsData,
        hashvalue
      );
      res.send({ status: products });
    } catch (error) {
      res.send("something went wrong");
    }
  } else {
    res.send("please enter product details");
  }
});

router.put("/updateProduct", async (req, res) => {
  let newUpdatedProductDetails = req.body;
  let hashvalue = req.query.hash;
  if (newUpdatedProductDetails) {
    try {
      const products = await serviceObject.updateProductOnStore(
        newUpdatedProductDetails,
        hashvalue
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
  let hashvalue = req.query.hash;
  let product_id = req.query.id;
  if (hashvalue) {
    try {
      const products = await serviceObject.deleteProductFromStore(
        hashvalue,
        product_id
      );
      res.send({ status: products.data });
    } catch (error) {
      res.send({ status: error });
    }
  } else {
    res.send("please enter store hash");
  }
});

module.exports = router;
