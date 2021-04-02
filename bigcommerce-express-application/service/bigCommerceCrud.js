const resourceObject = require("../Resouce/database");

const axios = require("axios");
const { application } = require("express");

async function getProductsFromStore(hdata) {
  let tdata = await resourceObject.getStoreToken(hdata);
  console.log(await tdata);

  const headers = {
    "X-Auth-Token": tdata,
  };
  try {
    const products = await axios({
      method: "get",
      url: `https://api.bigcommerce.com/stores/${hdata}/v3/catalog/products`,
      headers: headers,
    });
    // console.log(products.data);
    return products.data;
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
}

async function createProduct(productDetails, hdata) {
  let tdata = await resourceObject.getStoreToken(hdata);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Auth-Token": tdata,
  };
  try {
    const response = await axios({
      method: "post",
      url: `https://api.bigcommerce.com/stores/${hdata}/v3/catalog/products`,
      headers: headers,
      data: productDetails,
    });
    console.log(`creation status : ${response.statusText}`);
    return response.statusText;
  } catch (error) {
    console.log(error);
    return { message: "something went wrong" };
  }
}

async function updateProductOnStore(updatedDetails, hdata) {
  let tdata = await resourceObject.getStoreToken(hdata);
  let product_id = updatedDetails.id;
  let { description, name, sku, type } = updatedDetails;
  let updatedData = { description, name, sku, type };

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Auth-Token": tdata,
  };
  try {
    const response = await axios({
      method: "put",
      url: `https://api.bigcommerce.com/stores/${hdata}/v3/catalog/products/${product_id}`,
      headers: headers,
      data: updatedData,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { message: "something went wrong" };
  }
}

async function deleteProductFromStore(productid, hdata) {
  let tdata = await resourceObject.getStoreToken(hdata);
  console.log(productid);
  let product_id = productid;
  const headers = {
    "Content-Type": "application/json",
    "X-Auth-Token": tdata,
    Accept: "application/json",
  };
  try {
    const response = await axios({
      method: "delete",
      url: `https://api.bigcommerce.com/stores/${hdata}/v3/catalog/products/${product_id}`,
      headers: headers,
    });
    return response;
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
}

module.exports = {
  getProductsFromStore,
  createProduct,
  deleteProductFromStore,
  updateProductOnStore,
};
