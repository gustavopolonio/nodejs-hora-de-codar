import { Product } from '../models/Product.js'

export const ProductController = class ProductController {
  static async showProducts(req, res) {
    const products = await Product.getAllProducts()
    res.render('products/all', { products })
  }

  static createProduct(req, res) {
    res.render('products/create')
  }

  static async createProductPost(req, res) {
    const { name, imageUrl, price, description } = req.body

    const product = new Product(name, imageUrl, price, description)
    await product.save()

    res.redirect('/products')
  }
}
