const repository = require("./databaseOrdersClient");
const axios = require("axios");
const Order = require("../models/orders");

async function createOrder(orderDetails) {
  const response = await repository.addOrder(orderDetails);
  console.log("incrud", response);
  console.log(response);
  let { order, dbOrderId } = orderDetails;
  if (response.status == 200) {
    try {
      const result = await axios({
        method: "post",
        url: `https://68e6d846bc4bbecfa7174b4020118afa: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@my-test-store-development.myshopify.com/admin/api/2021-01/orders.json`,
        data: { order },
      });
      //   console.log(result);
      //   console.log(`creation status : ${result}`);
      let dbRes = await Order.findOne({ dbOrderId: dbOrderId });
      console.log("-------------------");
      console.log(dbRes);
      dbRes.order = result.data.order;
      (await dbRes).save();
      //   console.log(dbRes);
      return result;
    } catch (error) {
      console.log(error);
      return { message: "something went wrong" };
    }
  } else {
    return { message: "In shopify orders something went wrong" };
  }
}

// async function deleOrder(order_id) {
//   const response = await Order.deleteOne({ id: order_id });
//   console.log("incrud", response);
//   if (responce) {
//     try {
//       const result = await axios({
//         method: "post",
//         url: `https://68e6d846bc4bbecfa7174b4020118afa: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@my-test-store-development.myshopify.com/admin/api/2021-01/orders/${order_id}.json`,

//       });
//       return result;
//     } catch (error) {
//       console.log(error);
//       return { message: "something went wrong" };
//     }
//   } else {
//     return { message: "In shopify orders something went wrong" };
//   }
// }

async function updateOrder(data) {
  const order = data.body.order;
  const dbOrderId = data.body.dbOrderId;
  const response = await Order.find({ dbOrderId: dbOrderId });
  console.log("---------------");
  console.log(response[0].order.email);
  console.log(order.email);
  response[0].order.email = order.email;
  console.log(response[0].order.email);
  await response[0].save();
  const mdata = { order: order };
  console.log("incrud", response);
  if (response) {
    try {
      const result = await axios({
        method: "put",
        url: `https://68e6d846bc4bbecfa7174b4020118afa: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@my-test-store-development.myshopify.com/admin/api/2021-01/orders/${response.order.id}.json`,
        data: mdata,
      });
      return result;
    } catch (error) {
      console.log(error);
      return { message: "something went wrong" };
    }
  } else {
    return { message: "In shopify orders something went wrong" };
  }
}

async function countOrder() {
  try {
    const result = await axios({
      method: "get",
      url: `https://68e6d846bc4bbecfa7174b4020118afa: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@my-test-store-development.myshopify.com/admin/api/2021-01/orders/count.json`,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return { message: "something went wrong" };
  }
}

async function getAllOrders() {
  try {
    const result = await axios({
      method: "get",
      url: `https://68e6d846bc4bbecfa7174b4020118afa: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@my-test-store-development.myshopify.com/admin/api/2021-01/orders.json?status=any`,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong please check" };
  }
}

module.exports = {
  createOrder,
  updateOrder,
  countOrder,
  getAllOrders,
};
