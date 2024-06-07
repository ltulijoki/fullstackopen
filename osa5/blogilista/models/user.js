const mongoose = require('mongoose')
const unique = require('mongoose-unique-validator')

const schema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

schema.plugin(unique)

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('Blogilist User', schema)

module.exports = User