import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);
        
        const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${ConnectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB Connection error: ", error.message);
        process.exit(1);
    }
}

export default connectDB;