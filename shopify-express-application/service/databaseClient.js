const client = require("../integration/database");

async function addTokenToDB(newStore) {
  let res = await client.addNewStore(newStore);
  return res;
}

async function isStoreTokenized(store) {
  let res = await client.isStoreTokenPresent(store);
  console.log(res);
  if (res) {
    return true;
  }
  return false;
}

async function getStoreAccessToken(store) {
  let res = await client.getStoreTokenFromDB(store);
  console.log(`received from DB:${res}`);
  return res;
}

module.exports = { addTokenToDB, isStoreTokenized, getStoreAccessToken };
