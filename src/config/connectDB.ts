import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        console.log("MONGO URI:", process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI as string, {

        });
        console.log('DB Connected:', conn.connection.host)
        
    } catch (error) {
        console.error('Error connecting to DB: ', error);
        process.exit(1);
    }
    
}