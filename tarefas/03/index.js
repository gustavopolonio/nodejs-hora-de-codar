const express = require('express')
const path = require('path')

const userRoutes = require('./user')

const app = express()
const port = 5000

const basePath = path.join(__dirname, 'templates')

app.use(express.static('public'))

app.use('/user', userRoutes)

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

// app.get('/user', (req, res) => {
//   res.sendFile(`${basePath}/user.html`)
// })

app.listen(port, () => {
  console.log(`Server initialized on port ${port}`)
})