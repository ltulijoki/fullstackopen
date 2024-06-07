require('dotenv').config()
const mongoose = require('mongoose')
const person = require('./models/person')

mongoose.connect(process.env.MONGODB_URI)
person.deleteMany({}).then(r => mongoose.connection.close())