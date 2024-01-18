// brew services start mongodb-community  =>  start mongo
import { MongoClient } from 'mongodb'

const url = 'mongodb://127.0.0.1:27017/testemongodb'
const client = new MongoClient(url)

async function connectToMongo() {
  try {
    await client.connect()
    console.log('Connected to mongo db')
  } catch(error) {
    console.log("Couldn't connect to mongo db")
  }
}

connectToMongo()

export { connectToMongo }