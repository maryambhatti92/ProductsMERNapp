import express from "express";
import {getProducts, CreateProduct, DeleteProduct, UpdateProduct} from "../controllers/Products.controller.js";

const router = express.Router();

//Get Products
router.get('/',getProducts);
//Create Products
router.post('/', CreateProduct);
//Delete Products
router.delete("/:id", DeleteProduct);
//Update PRoducts
router.put('/:id', UpdateProduct);


export default router;
