import { Express } from "express";
import { tourRoutes } from "./tour.route";
import { categoryRoutes } from "./category.route";
import { userRoutes } from "./user.route";
import { cartRoutes } from "./cart.route";

const clientRoutes = (app: Express): void => {
    app.use("/tours", tourRoutes);

    app.use("/categories", categoryRoutes);

    app.use('/user', userRoutes);

    app.use(`/cart`, cartRoutes);
}

export default clientRoutes;