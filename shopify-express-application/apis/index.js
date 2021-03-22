require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express.Router();
const repository = require("../service/authentication");
const dataBaseClient = require("../service/databaseClient");
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = "read_products";
const forwardingAddress = "https://26c2140e169c.ngrok.io";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/shopifyInstall", async (req, res) => {
  let shop = req.query.shop;
  let isThereToken = await dataBaseClient.isStoreTokenized(shop);
  console.log(isThereToken);
  if (!isThereToken) {
    let nonce = repository.generateNonce();
    const url = repository.generateURL({
      shop: shop,
      apiKey: apiKey,
      scopes: "write_orders,read_products,write_products",
      sharedSecret: apiSecret,
      redirectUri: `${forwardingAddress}/callback`,
      nonce: nonce,
      accessMode: "pre-user",
    });
    res.redirect(url);
  } else {
    res.redirect(`/shopify/products?shop=${shop}`);
  }
});

app.get("/callback", async (req, res) => {
  console.log("in callback");
  const returnValues = {
    code: req.query.code,
    hmac: req.query.hmac,
    shop: req.query.shop,
    state: req.query.state,
    timestamp: req.query.timestamp,
    sharedSecret: apiSecret,
    apiKey: apiKey,
  };
  let responce;
  try {
    responce = await repository.getToken(returnValues);
    console.log(responce);
  } catch (error) {
    console.log(error);
  }

  if (responce.status == 200) {
    const newStore = {
      storeName: req.query.shop,
      accessToken: responce.accessToken,
    };
    let { status } = await dataBaseClient.addTokenToDB(newStore);
    status == 200
      ? res.send("add to database")
      : res.send("failed to add database");
  } else {
    res.send(responce);
  }
});

module.exports = app;
