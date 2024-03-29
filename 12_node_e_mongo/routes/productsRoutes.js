import express from 'express'

import { ProductController } from '../controllers/ProductController.js'

export const productsRouter = express.Router()

productsRouter.post('/create', ProductController.createProductPost)
productsRouter.get('/create', ProductController.createProduct)
productsRouter.post('/remove/:id', ProductController.removeProduct)
productsRouter.post('/edit/:id', ProductController.editProductPost)
productsRouter.get('/edit/:id', ProductController.editProduct)
productsRouter.get('/:id', ProductController.showProduct)
productsRouter.get('/', ProductController.showProducts)