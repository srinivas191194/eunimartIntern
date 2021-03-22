const repository = require("./databaseClient");
const axios = require("axios");

async function getProductsFromStore(store) {
  let { accessToken } = await repository.getStoreAccessToken(store);
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": accessToken,
  };
  try {
    const products = await axios({
      method: "get",
      url: `https://${store}/admin/api/2021-01/products.json`,
      headers: headers,
    });
    console.log(products.data);
    return products.data;
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong." };
  }
}

async function createProduct(productDetails, store) {
  let { accessToken } = await repository.getStoreAccessToken(store);
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": accessToken,
  };
  try {
    const responce = await axios({
      method: "post",
      url: `https://${store}/admin/api/2021-01/products.json`,
      headers: headers,
      data: productDetails,
    });
    console.log(`creation status : ${responce.statusText}`);
    return responce.statusText;
  } catch (error) {
    console.log(error);
    return { message: "something went wrong" };
  }
}

async function updateProductOnStore(updatedDetails, store) {
  let { accessToken } = await repository.getStoreAccessToken(store);
  let productId = updatedDetails.product.id;
  console.log(productId);
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": accessToken,
  };
  try {
    const response = await axios({
      method: "put",
      url: `https://${store}/admin/api/2021-01/products/${productId}.json`,
      headers: headers,
      data: updatedDetails,
    });
    return response;
  } catch (error) {
    console.log(error);
    return { message: "something went wrong" };
  }
}

async function deleteProductFromStore(productId, store) {
  let { accessToken } = await repository.getStoreAccessToken(store);
  console.log(productId);
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": accessToken,
  };
  try {
    const response = await axios({
      method: "delete",
      url: `https://${store}/admin/api/2021-01/products/${productId}.json`,
      headers: headers,
    });
    return response;
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
}

async function getCountOfProducts(store) {
  let { accessToken } = await repository.getStoreAccessToken(store);
  if (accessToken) {
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    };
    try {
      const responce = await axios({
        method: "get",
        url: `https://${store}/admin/api/2021-01/products/count.json`,
        headers: headers,
      });
      return responce;
    } catch (error) {
      console.log(error);
      return { message: "some thing went wrong" };
    }
  } else {
    return { message: "Store not found in database" };
  }
}
async function getProductByIds(token, ids, store) {
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": token,
  };
  try {
    const responce = await axios({
      method: "get",
      url: `https://${store}/admin/api/2021-01/products.json?ids=${ids}`,
      headers: headers,
    });
    return responce.data;
  } catch (error) {
    console.log(error);
    return { message: "some thing went wrong" };
  }
}
async function getProductsWithSpecificFields(token, fields, store) {
  console.log(token);
  console.log(fields);
  console.log(store);
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": token,
  };
  try {
    const responce = await axios({
      method: "get",
      url: `https://${store}/admin/api/2021-01/products.json?fields=${fields}`,
      headers: headers,
    });
    return responce.data;
  } catch (error) {
    console.log(error);
    return { message: "some thing went wrong" };
  }
}

async function customizedFunction(store) {
  let { accessToken } = await repository.getStoreAccessToken(store.shopName);
  // console.log(accessToken);
  // console.log(store);
  if (accessToken && store.ids) {
    let responce = getProductByIds(accessToken, store.ids, store.shopName);
    return responce;
  } else if (accessToken && store.fields) {
    let responce = getProductsWithSpecificFields(
      accessToken,
      store.fields,
      store.shopName
    );
    return responce;
  } else {
    return { message: "store not found in database" };
  }
}
module.exports = {
  getProductsFromStore,
  createProduct,
  updateProductOnStore,
  deleteProductFromStore,
  getCountOfProducts,
  customizedFunction,
};
