const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

app.get('/', (req, res) => {
  const user = {
    name: 'Gustavo',
    surname: 'Polonio'
  }

  const text = 'Text'

  const isAuth = false

  res.render('home', { user, text, isAuth } )
})

app.listen(3000, () => console.log('Server initialized')) 