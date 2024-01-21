import mongoose from 'mongoose'

const { Schema } = mongoose

export const Product = mongoose.model(
  'Product',
  new Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }
  })
)
