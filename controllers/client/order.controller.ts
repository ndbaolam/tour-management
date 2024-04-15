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
}