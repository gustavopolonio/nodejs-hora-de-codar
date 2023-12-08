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
      return
    }

    res.redirect('/books')
  })
})

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books'

  connection.query(q, (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    res.render('books', { books: data })
  })
})

app.get('/books/:id', (req, res) => {
  const { id } = req.params

  const q = `SELECT * FROM books WHERE id = ${id}`

  connection.query(q, (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    // console.log('data', data)
    const book = data[0]

    res.render('book', { book })
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