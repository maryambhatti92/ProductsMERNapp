import mongoose from 'mongoose';
import { type } from 'os';

const TodoSchema = new mongoose.Schema(
{
     title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    }
    
},
{
    timestamps:true
}
);

const Todos=mongoose.model('Todo', TodoSchema);
export default Todos;