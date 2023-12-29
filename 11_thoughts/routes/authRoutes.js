import express from 'express'

import { AuthController } from '../controllers/AuthController.js'

const authRouter = express.Router()

authRouter.get('/login', AuthController.login)
authRouter.get('/register', AuthController.register)
authRouter.post('/register', AuthController.registerPost)

export { authRouter as authRoutes }