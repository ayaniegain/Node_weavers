import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String, 
  price: Number,
  quantity: Number,
 
});


export default productSchema;
