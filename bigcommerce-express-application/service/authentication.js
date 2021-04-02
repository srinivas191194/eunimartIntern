const { urlencoded } = require("express");
const axios = require("axios");
const resourceObject = require("../Resouce/database");
const base64url = require("base64url");
const CryptoJS = require("crypto-js");
// async function generateToken(data) {
//   const header = {
//     "Content-Type": "application/json",
//   };
//   try {
//     let url = `https://login.bigcommerce.com/oauth2/token?client_id=${data.identity}&client_secret=${data.secretcode}&code=${data.temporarycode}&scope=${data.scope}&grant_type=authorization_code&redirect_uri=${data.redirectURL}&context=${data.context}`;
//     const response = await axios.post(url);
//     console.log(responce.data);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return "400";
//   }
// }

async function getToken(shopvalues) {
  console.log(shopvalues);
  const jsonobject = await generateToken(shopvalues);
  console.log(jsonobject.status);
  if (jsonobject.status == 200) {
    return jsonobject;
  } else {
    return { message: "URL verification failed", status: 400 };
  }
}

async function generateToken(data) {
  let buildURL = `https://login.bigcommerce.com/oauth2/token?client_id=${data.identity}&client_secret=${data.secretcode}&code=${data.temporarycode}&scope=${data.scope}&grant_type=authorization_code&redirect_uri=${data.redirecturi}&context=${data.context}`;
  try {
    let response = await axios.post(buildURL);
    console.log(
      "generated token-------------------------->" + response.data.access_token
    );
    return {
      status: 200,
      message: "Reached to service & generated token sucessfully",
      token: response.data.access_token,
    };
  } catch (error) {
    console.log(error);
    return {
      code: 400,
      data: "Reached to service layer something went wrong",
    };
  }
}

async function checkingFunction(data) {
  arr = data.payload.split(".");
  encoded_json_string = arr[0];
  encoded_hmac_signature = arr[1];
  let decoded_json_string = base64url.decode(encoded_json_string);
  console.log("In checking function value1--------->  " + decoded_json_string);
  let decoded_hamc_signature = base64url.decode(encoded_hmac_signature);
  console.log(
    "In checking Function value2--------->  " + decoded_hamc_signature
  );
  console.log(typeof decoded_json_string);
  console.log(typeof decoded_hamc_signature);
  // let object = JSON.parse(decoded_json_string);
  // console.log("object---------->" + object);
  const hash = CryptoJS.HmacSHA256(decoded_json_string, data.secretcode);
  console.log(typeof hash);
  console.log("hash Value ---------------->" + hash);
  if (hash == decoded_hamc_signature) {
    console.log("Both got matched");
    let object = JSON.parse(decoded_json_string);
    console.log(object);
    let result = await resourceObject.addNewDocument(object, data.token);
    return result;
  } else {
    return { status: 400, message: "Not matched" };
  }
}
module.exports = { getToken, checkingFunction };
