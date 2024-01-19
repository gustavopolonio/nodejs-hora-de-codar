import express from 'express'

import { ProductController } from '../controllers/ProductController.js'

export const productsRouter = express.Router()

productsRouter.post('/create', ProductController.createProductPost)
productsRouter.get('/create', ProductController.createProduct)
productsRouter.get('/', ProductController.showProducts)