const { urlencoded } = require("express");
const { response } = require("../app");
const axios = require("axios");
const resourceObject = require("../Resouce/database");
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
    return { status: 200, message: jsonobject.message };
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
    let databaseResponce = await resourceObject.addNewDocument(response.data);
    return databaseResponce;
  } catch (error) {
    console.log(error);
    return {
      code: 400,
      data: "Reached to service layer something went wrong",
    };
  }
}
module.exports = { getToken };
