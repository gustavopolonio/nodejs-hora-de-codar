const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  const user = {
    name: 'Gustavo',
    surname: 'Polonio'
  }

  const text = 'Text'

  res.render('home', { user, text } )
})

app.listen(3000, () => console.log('Server initialized')) 