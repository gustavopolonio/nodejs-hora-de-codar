const express = require('express')
const exphbs = require('express-handlebars')
const sequelize = require('./db/conn')
const User = require('./models/user')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/users/create', (req, res) => {
  return res.render('addUser')
})

app.post('/users/create', async (req, res) => {
  const { name, occupation } = req.body
  let { newsletter } = req.body

  if (newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false
  }

  await User.create({ name, occupation, newsletter })
  
  res.redirect('/')
})

app.get('/', (req, res) => {
  return res.render('home')
})


sequelize
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((e) => {
    console.log(e)
  })
