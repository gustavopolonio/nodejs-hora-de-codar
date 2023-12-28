import express from 'express'

import { AuthController } from '../controllers/AuthController.js'

const authRouter = express.Router()

authRouter.get('/login', AuthController.login)
authRouter.get('/register', AuthController.register)

export { authRouter as authRoutes }