import mongoose from 'mongoose'

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/getapet')
  console.log('Connected to Mongo')
}

main().catch(error => console.log(error))

export { mongoose }