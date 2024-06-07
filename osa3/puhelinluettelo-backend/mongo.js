const mongoose = require('mongoose')

if (process.argv.length < 3) {
  process.exit(1)
}

const salasana = process.argv[2]

const url = `mongodb+srv://Leevi:${salasana}@cluster0.espsf.mongodb.net/Leevin_fs?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const schema = new mongoose.Schema({
  name: String,
  number: String
})

const Numero = mongoose.model('Numero', schema)

if (process.argv.length === 5) {
  const numero = new Numero({
    name: process.argv[3],
    number: process.argv[4]
  })

  numero.save().then(response => {
    console.log(`added ${response.name} number ${response.number} to phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length === 3) {
  Numero.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(numero => {
      console.log(`${numero.nimi} ${numero.numero}`)
    })
    mongoose.connection.close()
  })
} else {
  Numero.find({}).then(() => {
    mongoose.connection.close()
  })
}