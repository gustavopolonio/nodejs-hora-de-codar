import mongoose from 'mongoose';
// import mongoose from '../db/conn.js'
const { Schema } = mongoose

export const User = mongoose.model(
  'User',
  new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  })
)