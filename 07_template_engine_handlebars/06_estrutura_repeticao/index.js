const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {
  const items = ['Item 1', 'Item 2', 'Item 3']

  res.render('dashboard', { items })
})

app.get('/', (req, res) => {
  const user = {
    name: 'Gustavo',
    surname: 'Polonio'
  }

  const text = 'Text'

  const isAuth = false
  const isApproved = false

  res.render('home', { user, text, isAuth, isApproved } )
})

app.listen(3000, () => console.log('Server initialized')) 