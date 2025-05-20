import mongoose from "mongoose";

async function dbConnected() {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

}

export default dbConnected;
