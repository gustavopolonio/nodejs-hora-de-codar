import { Product } from '../models/Product.js'

export const ProductController = class ProductController {
  static async showProducts(req, res) {
    const products = await Product.getAllProducts()
    res.render('products/all', { products })
  }

  static async showProduct(req, res) {
    const { id } = req.params
    const product = await Product.getProductById(id)
    res.render('products/product', { product })
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

  static async editProduct(req, res) {
    const { id } = req.params
    const product = await Product.getProductById(id)
    res.render('products/edit', { product })
  }

  static async editProductPost(req, res) {
    const { id } = req.params
    const { name, imageUrl, price, description } = req.body

    const product = new Product(name, imageUrl, price, description)
    await product.editProductById(id)
    res.redirect('/products')
  }

  static async removeProduct(req, res) {
    const { id } = req.params
    await Product.removeProductById(id)
    res.redirect('/products')
  }
}
