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
  await book.insertMany([
    {
      "title": "Clean Code",
      "published": 2008,
      "author": "63612dcc83853029c0a7a2fc",
      "_id": "63612dcd83853029c0a7a2fe",
      "genres": [
        "refactoring"
      ]
    },
    {
      "title": "Agile software development",
      "published": 2002,
      "author": "63612dcc83853029c0a7a2fc",
      "_id": "63612df583853029c0a7a304",
      "genres": [
        "agile",
        "patterns",
        "design"
      ]
    },
    {
      "title": "Refactoring, edition 2",
      "published": 2018,
      "author": "63612e2f83853029c0a7a30a",
      "_id": "63612e2f83853029c0a7a30c",
      "genres": [
        "refactoring"
      ]
    },
    {
      "title": "Refactoring to patterns",
      "published": 2008,
      "author": "63612e5e83853029c0a7a312",
      "_id": "63612e5e83853029c0a7a314",
      "genres": [
        "refactoring",
        "patterns"
      ]
    },
    {
      "title": "Practical Object-Oriented Design, An Agile Primer Using Ruby",
      "published": 2012,
      "author": "63612eb683853029c0a7a31a",
      "_id": "63612eb683853029c0a7a31c",
      "genres": [
        "refactoring",
        "design"
      ]
    },
    {
      "title": "Crime and punishment",
      "published": 1866,
      "author": "63612efd83853029c0a7a322",
      "_id": "63612efd83853029c0a7a324",
      "genres": [
        "classic",
        "crime"
      ]
    },
    {
      "title": "The Demon",
      "published": 1872,
      "author": "63612efd83853029c0a7a322",
      "_id": "63612f1783853029c0a7a32a",
      "genres": [
        "classic",
        "revolution"
      ]
    }
  ])
  await author.insertMany([
    {
      "name": "Robert Martin",
      "_id": "63612dcc83853029c0a7a2fc",
      "born": 1952,
      "bookCount": 2
    },
    {
      "name": "Martin Fowler",
      "_id": "63612e2f83853029c0a7a30a",
      "born": 1963,
      "bookCount": 1
    },
    {
      "name": "Joshua Kerievsky",
      "_id": "63612e5e83853029c0a7a312",
      "born": null,
      "bookCount": 1
    },
    {
      "name": "Sandi Metz",
      "_id": "63612eb683853029c0a7a31a",
      "born": null,
      "bookCount": 1
    },
    {
      "name": "Fyodor Dostoevsky",
      "_id": "63612efd83853029c0a7a322",
      "born": 1821,
      "bookCount": 2
    }
  ])
  await user.insertMany([
    {
      "username": "ref",
      "favoriteGenre": "refactoring",
      "_id": "636132e6116e810688087ac7"
    },
    {
      "username": "agi",
      "favoriteGenre": "agile",
      "_id": "63613305116e810688087ac9"
    },
    {
      "username": "pat",
      "favoriteGenre": "patterns",
      "_id": "6361331b116e810688087acb"
    },
    {
      "username": "des",
      "favoriteGenre": "design",
      "_id": "6361332a116e810688087acd"
    },
    {
      "username": "cla",
      "favoriteGenre": "classic",
      "_id": "6361333c116e810688087acf"
    },
    {
      "username": "cri",
      "favoriteGenre": "crime",
      "_id": "63613344116e810688087ad1"
    },
    {
      "username": "rev",
      "favoriteGenre": "revolution",
      "_id": "6361334f116e810688087ad3"
    }
  ])
  mongoose.connection.close()
  console.log('\n\nCLEARED AND INSERTED')
}

clear()