import mongoose from 'mongoose';
import { type } from 'os';

const productSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required:true,
    },
    image:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
);

const products=mongoose.model('Product', productSchema);
export default products;