import { mongoClient } from '../db/conn.js'

export class Product {
  constructor(name = undefined, imageUrl = undefined, price = undefined, description = undefined) {
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

  getAllProducts() {
    const products = mongoClient.db('mongo_test').collection('products').find().toArray()
    return products
  }
}