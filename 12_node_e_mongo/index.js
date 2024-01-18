import express from 'express'
import exphbs from 'express-handlebars'

import { connectToMongo } from './db/conn.js'

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.listen(3000)