require('dotenv').config()
const mongoose = require('mongoose')
const person = require('./models/person')
const user = require('./models/user')

mongoose.connect(process.env.MONGODB_URI)
person.deleteMany({}).then(r => {
  person.insertMany([
    {
      "name": "Arto Hellas",
      "phone": "040-123543",
      "street": "Tapiolankatu 5 A",
      "city": "Espoo",
      "_id": "635ff37b90aa249d40d7a88f"
    },
    {
      "name": "Matti Luukkainen",
      "phone": "040-432342",
      "street": "Malminkaari 10 A",
      "city": "Helsinki",
      "_id": "6362796519990a2d1898bf57"
    },
    {
      "name": "Venla Ruuska",
      "street": "Nallemäentie 22 C",
      "city": "Helsinki",
      "_id": "6362799b19990a2d1898bfc6"
    }
  ]).then(r => {
    user.deleteMany({}).then(r => mongoose.connection.close())
  })
})