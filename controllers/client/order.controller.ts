import { Request, Response } from "express";

//[POST] /order
export const order = async (req: Request, res: Response) => {
  const data = req.body;

  res.json({
    data: data,
    message: "Order Successfull!"
  });
}