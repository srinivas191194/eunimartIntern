const Store = require("../models/store");

async function addNewDocument(data, tokendata) {
  console.log(data);
  let details = {
    storeHash: data.store_hash,
    accessToken: tokendata,
    userid: data.user.id,
    userName: data.user.username,
    useremail: data.user.email,
  };
  console.log(details);
  const newDocument = new Store(details);
  try {
    await newDocument.save();
    return { status: 200, message: "Added to database", hash: data.store_hash };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: "Reached to Resource Layer Not added to database",
    };
  }
}

async function getStoreToken(hdata) {
  const res = await Store.findOne({ storeHash: hdata });
  if (res) {
    console.log(`from DB:${res}`);
    console.log("token got from database" + res.accessToken);
    return res.accessToken;
  } else {
    console.log("Not a valid storehash,please check");
  }
}

module.exports = { addNewDocument, getStoreToken };
