require("dotenv").config({ path: "../.env" });
var express = require("express");
var router = express.Router();
const id = process.env.client_id;
const secret = process.env.client_secret;
const redirect = "https://fe0df1bd508d.ngrok.io/install";
const serviceObject = require("../service/authentication");
let genetoken = "";

router.get("/", function (req, res, next) {
  res.send("Hello world");
});

router.get("/install", async (req, res) => {
  let shop = {
    temporarycode: req.query.code,
    scope: req.query.scope,
    context: req.query.context,
    identity: id,
    secretcode: secret,
    redirecturi: redirect,
  };
  // console.log(shop);
  try {
    result = await serviceObject.getToken(shop);
    if (result.status == 200) {
      genetoken = result.token;
      console.log(result);
      console.log(genetoken);
    } else {
      console.log(result);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/load", async (req, res) => {
  let verification = {
    payload: req.query.signed_payload,
    secretcode: secret,
    token: genetoken,
  };
  try {
    result = await serviceObject.checkingFunction(verification);
    console.log("In verification" + verification.payload);
    if (result.status == 200) {
      const products = res.redirect(
        `/bigcommerce/getproducts?hash=${result.hash}`
      );
      console.log("Srinivas" + products);
      // console.log(result.message);
    } else {
      console.log("something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = { router, genetoken };
