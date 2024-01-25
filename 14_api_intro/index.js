import express from 'express'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'First route' })
})

app.post('/create-product', (req, res) => {
  const { name, price } = req.body
  console.log(name, price)

  res.json({ message: `Product ${name} was created!` })
})

app.listen(3000)