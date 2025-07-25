import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import Productroutes from "./route/Product.route.js";



    dotenv.config();
    const app =express();
    app.use(express.json());
    console.log(process.env.MONGO_URI);

    app.use("/api/products",Productroutes);
const PORT = process.env.PORT|| 5001;

app.listen (PORT, () =>
{
    connectDb();
    console.log("server started at http://localhost:" + PORT);
});