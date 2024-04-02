import { Request, Response } from "express";
import Tour from "../../models/tours.model";
import sequelize from "../../config/database";

export const index = async (req: Request, res: Response) =>{
    const slugCategory = req.params.slugCategory;

    const query = `
        SELECT tours.*, price * (1 - discount/100) AS price_special
        FROM tours
        JOIN tours_categories ON tours.id = tours_categories.tour_id
        JOIN categories ON tours_categories.category_id = categories.id
        WHERE
            categories.slug = '${slugCategory}'
            AND tours.deleted = false
            AND tours.status = 'active'
            AND categories.deleted = false
            AND categories.status = 'active';
    `;

    const tours = await sequelize.query(query,{
        model: Tour,
        raw: true,
    });

    //console.log(tours);

    res.render("client/pages/tours/index", {
        pageTitle: "Danh sách tour",
        tours: tours
    });
}