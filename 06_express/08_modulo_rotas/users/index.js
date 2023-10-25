const path = require('path')
const express = require('express')

const router = express.Router()

const basePath = path.join(__dirname, '../templates')

router.get('/create', (req, res) => {
  res.sendFile(`${basePath}/userForm.html`)
})

router.post('/create', (req, res) => {
  const { name, age } = req.body

  console.log(`New User! Name: ${name}, age: ${age}`)

  res.redirect('/')
})

router.get('/:id', (req, res) => {
  const userId = req.params.id
  console.log(`Buscando pelo userId: ${userId}`)
  res.sendFile(`${basePath}/users.html`)
})

module.exports = router