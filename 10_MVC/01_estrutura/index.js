import express from 'express'
import exphbs from 'express-handlebars'

import db from './db/conn.js'
import Task from './models/Task.js'
import TasksRoutes from './routes/tasksRoutes.js'

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.use('/tasks', TasksRoutes)

db.sync()
  .then(app.listen(3000))
  .catch(e => console.log(e))