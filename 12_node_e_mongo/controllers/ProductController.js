import { Product } from '../models/Product.js'

export const ProductController = class ProductController {
  static showProducts(req, res) {
    res.render('products/all')
  }
}
