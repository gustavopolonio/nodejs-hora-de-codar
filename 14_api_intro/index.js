import express from 'express'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/create-product', (req, res) => {
  const { name, price } = req.body
  // console.log(name, price)

  if (!name) {
    res.status(422).json({ message: 'Name field is required!' })
    return
  }

  res.status(201).json({ message: `Product ${name} was created!` })
})

app.get('/', (req, res) => {
  res.status(200).json({ message: 'First route' })
})

app.listen(3000)