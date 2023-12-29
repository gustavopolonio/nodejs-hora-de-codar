import express from 'express'

import { ThoughtController } from '../controllers/ThoughtController.js'
import { checkAuth } from '../helpers/auth.js'

const thoughtsRouter = express.Router()

thoughtsRouter.get('/dashboard', checkAuth, ThoughtController.dashboard)
thoughtsRouter.get('/', ThoughtController.showThoughts)

export { thoughtsRouter as thoughtsRoutes }