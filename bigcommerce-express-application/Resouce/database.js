const Store = require("../models/store");

async function addNewDocument(data) {
  console.log(data);
  let details = {
    storeHash: data.context,
    accessToken: data.access_token,
    userid: data.user.id,
    userName: data.user.username,
    useremail: data.user.email,
  };
  console.log(details);
  const newDocument = new Store(details);
  try {
    await newDocument.save();
    return { status: 200, message: "Added to database" };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: "Reached to Resource Layer Not added to database",
    };
  }
}

module.exports = { addNewDocument };
