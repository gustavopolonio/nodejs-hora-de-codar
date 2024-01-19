import { mongoClient } from '../db/conn.js'

export class Product {
  constructor(name, price, description) {
    this.name = name
    this.price = price
    this.description = description
  }

  async save() {
    const product = await mongoClient.db('mongo_test').collection('products').insertOne({
      name: this.name,
      price: this.price,
      description: this.description
    })

    return product
  }
}