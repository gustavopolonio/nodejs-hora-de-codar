import express from 'express'
import exphbs from 'express-handlebars'
import session from 'express-session'
import fileStore from 'session-file-store'
import flash from 'express-flash'

import { sequelize } from './db/conn.js'
import { Thought } from './models/Thought.js'
import { User } from './models/User.js'
import { thoughtsRoutes } from './routes/thoughtsRoutes.js'
import { authRoutes } from './routes/authRoutes.js'
import { ThoughtController } from './controllers/ThoughtController.js'

const app = express()
const FileStore = fileStore(session)

// template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// receive body response
app.use(express.urlencoded({ extended: true }))

app.use(express.json())

// public path
app.use(express.static('public'))

// session middleware
app.use(session({
  name: 'session',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    logFn: function() {},
    // path: require('path').join(require('os').tmpdir(), 'sessions')
  }),
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true
  }
}))

// flash messages (status system messages)
app.use(flash())

// set user session data from request to response
app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session
  }

  next()
})


app.use('/thoughts', thoughtsRoutes)
app.use('/', authRoutes)

app.get('/', ThoughtController.showThoughts)

sequelize
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch(err => console.log(err))