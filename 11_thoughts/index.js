import express from 'express'

import { sequelize } from './db/conn.js'

const app = express()

sequelize
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch(err => console.log(err))