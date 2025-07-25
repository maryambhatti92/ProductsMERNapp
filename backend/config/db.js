import mongoose  from "mongoose";

export const connectDb = async () =>{
    try{
   const conn = await mongoose.connect(process.env.MONGO_URI);
   console.log("Mongo Db connected at " + conn.connection.host );
    }
    catch(error){
    console.log('Error Message: ${error.message}')
    process.exit(1);
    }
}