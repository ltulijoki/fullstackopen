const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    validate: {
      validator: v => /[0-9]{2,3}-[0-9]*/.test(v),
      message: props => `ERROR: ${props.value} isn\`t valid phone number (2-3 numbers, - and numbers, number\`s length must be minimum 8 numbers.)`
    },
    minlength: 8
  }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Numero', schema)