const Store = require("../models/store");

async function addNewStore(store) {
  const newStore = new Store(store);
  try {
    await newStore.save();
    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
}

async function isStoreTokenPresent(store) {
  try {
    const res = await Store.findOne({ storeName: store });
    return res;
  } catch (error) {
    console.log(err);
    return;
  }
}

async function getStoreTokenFromDB(store) {
  const res = await Store.findOne({ storeName: store });
  console.log(`from DB:${res}`);
  return res;
}

modules.export = { addNewStore, isStoreTokenPresent, getStoreTokenFromDB };
