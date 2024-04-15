import { Request, Response } from "express";
import Order from "../../models/order.model";
import Tour from "../../models/tours.model";
import OrderItem from "../../models/order-item.model";

import * as generateHelper from '../../helpers/generate.helper';

//[POST] /order
export const order = async (req: Request, res: Response) => {
  const data = req.body;

  const dataOrder = {
    code: "",
    fullName: data.info.fullName,
    phone: data.info.phone,
    note: data.info.note,
    status: "initial",
  };

  const order = await Order.create(dataOrder);
  const orderId = order.dataValues.id;
  const code = generateHelper.generateOrderCode(orderId);

  await Order.update({
    code: code
  }, {
    where: {
      id: orderId
    }
  });

  for (const item of data.cart) {
    const dataItem = {
      orderId: orderId,
      tourId: item.tourId,
      quantity: item.quantity
    };

    const tourInfo = await Tour.findOne({
      where: {
        id: item.tourId,
        deleted: false,
        status: "active"
      },
      raw: true
    });

    await Tour.update({
      stock: tourInfo['stock'] - item.quantity,
    }, {
      where: {
        id: item.tourId
      }
    })

    dataItem['price'] = tourInfo['price'];
    dataItem['discount'] = tourInfo['discount'];
    dataItem['timeStart'] = tourInfo['timeStart'];

    await OrderItem.create(dataItem);
  }

  res.json({
    code: 200,
    orderCode: code,
    message: "Order Successfull!"
  });
};

// [GET] /order/success
export const success = async (req: Request, res: Response) => {
  const orderCode = req.query.orderCode;

  const order = await Order.findOne({
    where: {
      code: orderCode,
      deleted: false
    },
    raw: true,
  });

  const ordersItem = await OrderItem.findAll({
    where: {
      orderId: order['id']
    },
    raw: true,
  });

  let totalPrice = 0;

  for (const item of ordersItem) {
    item["price_special"] = (item["price"] * (1 - item["discount"] / 100));
    item["total"] = item["price_special"] * item["quantity"];

    const tourInfo = await Tour.findOne({
      where: {
        id: item["tourId"],
      },
      raw: true
    });

    item['image'] = JSON.parse(tourInfo['images'])[0];
    item['title'] = tourInfo['title'];
    item['slug'] = tourInfo['slug'];
    totalPrice += item['total'];
  } 

  res.render("client/pages/order/success", {
    pageTitle: "Đặt hàng thành công",
    order: order,
    ordersItem: ordersItem,
    totalPrice: totalPrice
  });
}