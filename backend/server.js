import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import Productroutes from "./route/Product.route.js";
import TodoRoutes from "./route/Todo.route.js";
import { logger, requestLogger } from './middleware/Logger.js';

    dotenv.config();
    const app =express();
    app.use(express.json());
    app.use(cors());
    //console.log(process.env.MONGO_URI);

    //app.use("/api/products",Productroutes);
    app.use("/api/Todo",TodoRoutes);
    app.use(requestLogger);

const PORT = process.env.PORT|| 5001;

app.listen (PORT, () =>
{
    connectDb();
    console.log("server started at http://localhost:" + PORT);
     logger.info(`Server running on port ${PORT}`);
});