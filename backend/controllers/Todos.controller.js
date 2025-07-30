import Todo from "../Models/Todo.model.js";
import { logger, requestLogger } from '../middleware/Logger.js';
import mongoose from "mongoose";

export const getTodos = async (req,res)=>{
    try{
    const Todos = await Todo.find();
    res.status(200).json({success:true,data: Todos});
    }
    catch(error)
    {
  logger.error('Error fetching Todo', { error: error.stack });
  res.status(500).json({success: false, message: "Server Error"});
    }

}

export const CreateTodo = async (req,res) =>{
    const todo = req.body;
  if (!todo.title || todo.title.length > 200 ){ 
         logger.warn('dsjfsjkdfhsdfhk');
     logger.warn('Todo creation failed, Validation Error');
    
   return res.status(400).json({success: false,message: "Title is required and must be at most 200 characters long"});}

    const newTodo = new Todo(todo);
    try{
    await  newTodo.save();
        res.status(200).json({success:true,data:newTodo});
        logger.info('Todo created', { todo: newTodo });
    }
    catch(error)

    {
console.log(error.message);
        logger.error('Error creating Todo', { error: error.stack });
        res.status(500).json({success: false, message: "Server Error"});
    }


}


export const DeleteTodo = async (req, res) => {
  const { id } = req.params;
  console.log("id:" + id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
     logger.warn('Todo Deletion Failed: Invalid ID');
    return res.status(404).json({ success: false, message: "Invalid Todo Id" });
  }

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      logger.warn(`Todo not found with ID: ${id}`);
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    logger.info(`Todo Deleted: ${id}`);
    return res.status(200).json({ success: true, message: "Todo Deleted!" });

  } catch (error) {
    console.error("Error deleting Todo: " + error.message);
    logger.error(`Error deleting Todo: ${error.stack}`);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const UpdateTodo = async(req, res)=>{
    const {id} = req.params;
    const todo = req.body;
     if(!mongoose.Types.ObjectId.isValid(id))
    {
         logger.warn('Todo Update Failed: Invalid ID');
        res.status(404).json({success:false,message:"Invalid Todo Id"});
    }
try {
   
    if (!todo.title || todo.title.length > 200 ){
     logger.info('Todo Update Failed: Validation problems');
   return res.status(400).json({success: false,message: "Title is required and must be at most 200 characters long!"});}

    const updateTodo = await Todo.findByIdAndUpdate(id,todo,{new: true});
      logger.info('Todo updated', todo);
    res.status(200).json({success:true,data:updateTodo});

} catch (error) {
     console.error("Error in Update Todo:" + error.message);
      logger.error('Error updating Todo', { error: error.stack });
    res.status(500).json({success: false, message: "Server Error"});
}
}