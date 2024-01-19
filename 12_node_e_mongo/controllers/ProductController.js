import { Product } from '../models/Product.js'

export const ProductController = class ProductController {
  static showProducts(req, res) {
    res.render('products/all')
  }

  static createProduct(req, res) {
    res.render('products/create')
  }

  static createProductPost(req, res) {
    const { name, price, description } = req.body

    const product = new Product(name, price, description)
    product.save()
    console.log(`Product saved: ${product}`)
    
    res.redirect('/products')
  }
}
