import { Request, Response } from "express";
import Tour from "../../models/tours.model";

export const index = async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    where: {
      deleted: false,
    },
    raw: true
  });

  tours.forEach(item => {
    if(item['images']) {
      const images = JSON.parse(item['images']);
      item['image'] = images[0];
    }
    item['price_special'] = item['price'] * (1 - item['discount'] / 100);
  });

  res.render('admin/pages/tours/index', {
    pageTitle: 'Danh sách tour',
    tours: tours
  })
}