const express = require('express')
const path = require('path')

const app = express()
const port = 3001

const basePath = path.join(__dirname, 'templates')

app.use(
  express.urlencoded({ extended: true })
)

app.use(express.json())

app.get('/users/create', (req, res) => {
  res.sendFile(`${basePath}/userForm.html`)
})

app.post('/users/create', (req, res) => {
  const { name, age } = req.body

  console.log(`New User! Name: ${name}, age: ${age}`)

  res.redirect('/')
})

app.get('/users/:id', (req, res) => {
  const userId = req.params.id
  console.log(`Buscando pelo userId: ${userId}`)
  res.sendFile(`${basePath}/users.html`)
})

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
  console.log(`Server initialized on port ${port}`)
})