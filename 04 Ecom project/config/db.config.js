import mongoose from "mongoose";


async function dbConnected(){ // is it okey?
        try {
             await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
        } catch (error) {
            console.log('connection error',error.message)
        }
}


export default dbConnected