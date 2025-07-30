import express from "express";
import {getProducts, CreateProduct, DeleteProduct, UpdateProduct} from "../controllers/Products.controller.js";
import {getTodos, CreateTodo, DeleteTodo, UpdateTodo} from "../controllers/Todos.controller.js";


const router = express.Router();


//Get Todos
router.get('/',getTodos);
//Create Todos
router.post('/', CreateTodo);
//Delete Todos
router.delete("/:id", DeleteTodo);
//Update Todos
router.put('/:id', UpdateTodo);


export default router;
