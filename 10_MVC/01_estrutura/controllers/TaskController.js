import Task from '../models/Task.js'

export default class TaskController {
  static createTask(req, res) {
    res.render('tasks/create')
  }

  static async createTaskSave(req, res) {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false
    }

    await Task.create(task)
    res.redirect('/tasks')
  }

  static async showTasks(req, res) {
    const tasks = await Task.findAll({ raw: true })
    
    res.render('tasks/all', { tasks })
  }

  static async updateTask(req, res) {
    const { id } = req.params

    const task = await Task.findOne({
      where: {
        id
      },
      raw: true
    })

    res.render('tasks/edit', { task })
  }

  static async updateTaskPost(req, res) {
    const { id, title, description } = req.body

    await Task.update({
      title,
      description
    }, {
      where: { id }
    })

    res.redirect('/tasks')
  }

  static async deleteTask(req, res) {
    const { id } = req.body
    
    await Task.destroy({
      where: {
        id
      }
    })

    res.redirect('/tasks')
  }
}