import Product from "../Models/Product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req,res)=>{
    try{
    const products = await Product.find();
    res.status(200).json({success:true,data: products});
    }
    catch(error)
    {
  console.log("Error in fetching products" + error.message);
  res.status(500).json({success: false, message: "Server Error"});
    }

}

export const CreateProduct = async (req,res) =>{
    const product = req.body;
    if (!product.name || !product.image || !product.price){
    return res.status(400).json({success: false,message: "Please provide all fields"});}

    const newProduct = new Product(product);
    try{
    await  newProduct.save();
        res.status(200).json({success:true,data:newProduct});
    }
    catch(error)
    {
       
        res.status(500).json({success: false, message: "Server Error"});
    }


}

export const DeleteProduct = async (req,res) => {
    const {id} = req.params;
    console.log("id:" + id);

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(404).json({success:false,message:"Invalid Product Id"});
    }
    try{
        products.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product Deleted!"});

    }

    catch(error)
    {
    console.error("Error in creating product:" + error.message);
    res.status(500).json({success: false, message: "Server Error"});
    }
}

export const UpdateProduct = async(req, res)=>{
    const {id} = req.params;
    const product = req.body;
     if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(404).json({success:false,message:"Invalid Product Id"});
    }
try {
   
    const updateProduct = await Product.findByIdAndUpdate(id,product,{new: true});
    res.status(200).json({success:true,data:updateProduct});

} catch (error) {
     console.error("Error in Update product:" + error.message);
    res.status(500).json({success: false, message: "Server Error"});
}
}