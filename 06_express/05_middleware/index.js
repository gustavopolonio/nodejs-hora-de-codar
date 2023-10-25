const express = require('express')
const path = require('path')

const app = express()
const port = 3001

const basePath = path.join(__dirname, 'templates')

const checkAuth = function (req, res, next) {
  req.authStatus = false

  if (req.authStatus) {
    console.log('Is logged in')
    next()
  } else {
    console.log('You need to log in!')
    next()
  }
}

const middle = (req, res, next) => {
  console.log('Middle')
  next()
}

app.use(checkAuth)

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.use(middle)

app.listen(port, () => {
  console.log(`Server initialized on port ${port}`)
})