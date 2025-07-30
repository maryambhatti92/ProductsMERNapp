import mongoose  from "mongoose";
import { logger } from '../middleware/Logger.js';

export const connectDb = async () =>{
    try{
   const conn = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
   // console.log("Mongo Db connected at " + conn.connection.host );
    }

    catch(error){
          logger.error(`Error: ${error.message}`);
   // console.log('Error Message: ${error.message}')
    process.exit(1);
    }
}