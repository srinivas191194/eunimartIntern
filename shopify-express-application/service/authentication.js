const crypto = require("crypto");
const axios = require("axios");
const CryptoJS = require("crypto-js");
const { SSL_OP_COOKIE_EXCHANGE } = require("constants");

function verifyHmac(returnValues) {
  let rebuiltString = "";
  const secret = returnValues.sharedSecret;
  const value = Object.keys(returnValues).sort();
  value.map(function (key) {
    if (key !== "hmac" && key !== "sharedSecret" && key !== "apiKey") {
      rebuiltString += `${key}=` + returnValues[key] + "&";
    }
  });

  const hashDigest = rebuiltString.slice(0, rebuiltString.length - 1);
  const hash = CryptoJS.HmacSHA256(hashDigest, secret);

  return hash == returnValues.hmac;
}

function validateShop(shop) {
  const regex = /^[a-z\d_.-]+[.]myshopify[.]com$/;
  if (shop.match(regex)) {
    return true;
  }
  return false;
}

function generateNonce() {
  return crypto.randomBytes(16).toString("hex");
}

async function generateToken(data) {
  const header = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const body = {
    client_id: data.apiKey,
    client_secret: data.sharedSecret,
    code: data.code,
  };

  try {
    const responce = await axios({
      method: "post",
      url: `https://${data.shop}/admin/oauth/access_token`,
      headers: header,
      data: body,
    });
    console.log(responce.data);
    return responce.data;
  } catch (error) {
    return { message: "Requesting access token failed.", status: 400 };
  }
}

function generateURL(data) {
  const buildURL = `https://${data.shop}/admin/oauth/authorize?client_id=${data.apiKey}&scope=${data.scopes}&redirect_uri=${data.redirectUri}&state=${data.nonce}&grant_options[]=${data.accessMode}`;
  return buildURL;
}

async function getToken(returnValues) {
  //First Security Check1
  const shopTest = validateShop(returnValues.shop);
  console.log("first  check" + shopTest);

  //Seccond Security Check2
  const status = verifyHmac(returnValues);
  console.log("second  check" + status);

  if (status) {
    const token = await generateToken(returnValues);
    return { status: 200, accessToken: token.access_token };
  } else {
    return { message: "URL verification failed.", status: 400 };
  }
}
