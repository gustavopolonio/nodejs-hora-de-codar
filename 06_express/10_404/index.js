const express = require('express')
const path = require('path')

const users = require('./users')

const app = express()
const port = 3001

const basePath = path.join(__dirname, 'templates')

app.use(
  express.urlencoded({ extended: true })
)

app.use(express.json())

// Arquivos estaticos
app.use(express.static('public'))

app.use('/users', users)

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.use(function (req, res, next) {
  res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
  console.log(`Server initialized on port ${port}`)
})