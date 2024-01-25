import express from 'express'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'First route' })
})

app.listen(3000)