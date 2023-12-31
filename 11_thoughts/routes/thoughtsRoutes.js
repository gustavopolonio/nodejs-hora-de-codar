import express from 'express'

import { ThoughtController } from '../controllers/ThoughtController.js'
import { checkAuth } from '../helpers/auth.js'

const thoughtsRouter = express.Router()

thoughtsRouter.get('/create', checkAuth, ThoughtController.createThought)
thoughtsRouter.post('/create', checkAuth, ThoughtController.createThoughtPost)
thoughtsRouter.get('/edit/:id', checkAuth, ThoughtController.updateThought)
thoughtsRouter.post('/edit', checkAuth, ThoughtController.updateThoughtPost)
thoughtsRouter.get('/dashboard', checkAuth, ThoughtController.dashboard)
thoughtsRouter.post('/remove', checkAuth, ThoughtController.removeThought)
thoughtsRouter.get('/', ThoughtController.showThoughts)

export { thoughtsRouter as thoughtsRoutes }