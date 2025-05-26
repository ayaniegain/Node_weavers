import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

async function dbConnected() {
    await mongoose.connect(process.env.MONGO_URL);

}

export default dbConnected;
