import express from 'express'

import { ProductController } from '../controllers/ProductController.js'

export const productsRouter = express.Router()

productsRouter.get('/', ProductController.showProducts)