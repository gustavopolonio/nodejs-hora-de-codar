import { ObjectId } from 'mongodb'

import { mongoClient } from '../db/conn.js'

export class Product {
  constructor(name, imageUrl, price, description) {
    this.name = name
    this.imageUrl = imageUrl
    this.price = price
    this.description = description
  }

  async save() {
    const product = await mongoClient.db('mongo_test').collection('products').insertOne({
      name: this.name,
      imageUrl: this.imageUrl,
      price: this.price,
      description: this.description
    })

    return product
  }

  static async getProductById(id) {
    const product = await mongoClient.db('mongo_test').collection('products').findOne({
      _id: new ObjectId(id)
    })

    return product
  }

  static getAllProducts() {
    const products = mongoClient.db('mongo_test').collection('products').find().toArray()
    return products
  }

  async editProductById(id) {
    const product = await mongoClient.db('mongo_test').collection('products').updateOne({
      _id: new ObjectId(id)
    }, {
      $set: this
    })

    return product
  }

  static async removeProductById(id) {
    const deletedProduct = await mongoClient.db('mongo_test').collection('products').deleteOne({
      _id: new ObjectId(id)
    })

    return deletedProduct
  }
}