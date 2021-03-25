require("dotenv").config({ path: "../.env" });
var express = require("express");
var router = express.Router();
const id = process.env.client_id;
const secret = process.env.client_secret;
const redirect = "https://53d95c67aa26.ngrok.io/install";
const serviceObject = require("../service/authentication");
/* GET home page. */
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
    response = await serviceObject.getToken(shop);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
