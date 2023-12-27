import express from 'express'

import TaskController from '../controllers/TaskController.js'

const router = express.Router()

router.get('/create', TaskController.createTask)
router.post('/create', TaskController.createTaskSave)
router.get('/edit/:id', TaskController.updateTask)
router.post('/edit', TaskController.updateTaskPost)
router.post('/updateStatus', TaskController.toggleTaskStatus)
router.post('/delete', TaskController.deleteTask)
router.get('/', TaskController.showTasks)

export default router