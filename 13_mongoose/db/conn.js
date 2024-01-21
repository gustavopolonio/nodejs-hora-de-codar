// brew services start mongodb-community  =>  start mongo
import mongoose from 'mongoose'

const url = 'mongodb://127.0.0.1:27017/mongo_test'

async function main() {
  await mongoose.connect(url)
  console.log('Connected to mongo db with mongoose')
}

main().catch(err => console.log(err));

export { mongoose }