import { Request, Response } from "express";
import Tour from "../../models/tours.model";
import Category from "../../models/category.model";
import TourCategory from "../../models/tour-category.model";
import { generateTourCode } from "../../helpers/generate.helper";
import { systemConfig } from "../../config/system";

//[GET] /admin/tours/
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

//[GET] /admin/tours/create
export const create = async(req: Request, res: Response) => {
  const categories = await Category.findAll({
    where: {
      deleted: false
    },
    raw: true
  });

  res.render('admin/pages/tours/create', {
    pageTitle: "Thêm mới tour",
    categories: categories
  })
}

//[POST] /admin/tours/create
export const createPost = async(req: Request, res: Response) => {
  const countTour = await Tour.count();
  const code = generateTourCode(countTour + 1);

  if(req.body.position === ""){
    req.body.position = countTour + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const dataTour = {
    title: req.body.title,
    code: code,
    price: parseInt(req.body.price),
    discount: parseInt(req.body.discount),
    stock: parseInt(req.body.stock),
    timeStart: req.body.timrStart,
    position: req.body.position,
    status: req.body.status,
    image: JSON.stringify(req.body.images)
  };

  const tour = await Tour.create(dataTour);
  const tourId = tour.dataValues.id;

  await TourCategory.create({
    tour_id: tourId,
    category_id: parseInt(req.body.category_id)
  });

  res.redirect('back');
}