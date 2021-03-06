const express = require("express");
const path = require("path");

const index = require("./index.js");
const shopify = require("./shopify.js");
const orders = require("./ordersapi");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extend: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/shopify", shopify);
app.use("/orders", orders);

module.exports = app;
