const express = require('express')
const exphbs = require('express-handlebars')
const sequelize = require('./db/conn')
const User = require('./models/user')
const Address = require('./models/address')

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

app.get('/users/:id', async (req, res) => {
  const { id } = req.params

  const user = await User.findOne({
    raw: true,
    where: {
      id
    }
  })

  res.render('userView', { user })
})

app.get('/users/edit/:id', async (req, res) => {
  const { id } = req.params

  const user = await User.findOne({
    where: {
      id
    },
    include: Address
  })

  res.render('editUser', { user: user.get({ plain: true }) })
})

app.post('/users/update', async (req, res) => {
  const { id, name, occupation } = req.body
  let { newsletter } = req.body

  if (newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false
  }

  await User.update({ name, occupation, newsletter }, {
    where: {
      id
    }
  })

  res.redirect('/')
})

app.post('/users/delete/:id', async (req, res) => {
  const { id } = req.params

  await User.destroy({
    where: {
      id
    }
  })

  res.redirect('/')
})

app.post('/address/create', async (req, res) => {
  const { userId, street, number, city } = req.body

  await Address.create({ street, number, city, userId })

  res.redirect(`/users/edit/${userId}`)
})

app.get('/', async (req, res) => {
  const users = await User.findAll({ raw: true })

  return res.render('home', { users })
})


sequelize
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((e) => {
    console.log(e)
  })
