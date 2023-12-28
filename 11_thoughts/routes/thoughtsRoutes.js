import express from 'express'

import { ThoughtController } from '../controllers/ThoughtController.js'

const thoughtsRouter = express.Router()

thoughtsRouter.get('/', ThoughtController.showThoughts)

export { thoughtsRouter }