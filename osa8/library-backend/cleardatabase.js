require('dotenv').config()
const mongoose = require('mongoose')
const book = require('./models/book')
const author = require('./models/author')
const user = require('./models/user')

mongoose.connect(process.env.MONGODB_URI)

const clear = async () => {
  await book.deleteMany({})
  await author.deleteMany({})
  await user.deleteMany({})
  mongoose.connection.close()
  console.log('\n\nCLEARED')
}

clear()