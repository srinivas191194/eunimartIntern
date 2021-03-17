const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const crypto = require("crypto");
const cookie = require("cookie");
const nonce = require("nonce")();
const querystring = require("querystring");
// const request = require("request-promise");
const repository = require("../service/authentication");
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = "read_products";
const forwardingAddress = "https://46ac4e88137c.ngrok.io";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/shopifyInstall", async (req, res) => {
  let shop = req.query.shop;
  let nonce = repository.generateNonce();
  const url = repository.generateURL({
    shop: shop,
    apiKey: apiKey,
    scopes: "read_customers,write_orders,read_products,write_products",
    sharedSecret: apiSecret,
    redirectUri: `${forwardingAddress}/callback`,
    nonce: nonce,
    accessMode: "pre-user",
  });
  res.redirect(url);
});

app.listen(3000, () => {
  console.log("listen state");
});
