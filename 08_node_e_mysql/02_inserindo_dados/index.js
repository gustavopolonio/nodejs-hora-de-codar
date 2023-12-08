const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  return res.render('home')
})

app.post('/books/insertbook', (req, res) => {
  const { title, pageqty } = req.body

  const q = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

  connection.query(q, (err) => {
    if (err) {
      console.log(err)
    }

    res.redirect('/')
  })
})

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'nodemysql2'
})

connection.connect((err) => {
  if (err) {
    console.log(err)
  }

  console.log('Connected no mysql')

  app.listen(3000)
})