import express from 'express'

import { ThoughtController } from '../controllers/ThoughtController.js'
import { checkAuth } from '../helpers/auth.js'

const thoughtsRouter = express.Router()

thoughtsRouter.get('/create', checkAuth, ThoughtController.createThought)
thoughtsRouter.post('/create', checkAuth, ThoughtController.createThoughtPost)
thoughtsRouter.get('/dashboard', checkAuth, ThoughtController.dashboard)
thoughtsRouter.get('/', ThoughtController.showThoughts)

export { thoughtsRouter as thoughtsRoutes }