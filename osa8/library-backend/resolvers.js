const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { AuthenticationError, UserInputError } = require('apollo-server-core')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      var query = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        query.author = author._id
      }
      if (args.genre) {
        query.genres = { $in: [args.genre] }
      }
      return await Book.find(query)
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.current
  },
  Book: {
    author: root => {
      return Author.findById(root.author)
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.current) throw new AuthenticationError('you need log in to add book')

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        try {
          const newAuthor = new Author({ name: args.author, bookCount: 0 })
          await newAuthor.save()
          author = newAuthor
        } catch (exc) {
          throw new UserInputError('Author name is too short (minimum length is 4 characters)', {
            invalidArgs: args
          })
        }
      }
      try {
        const newBook = new Book({ ...args, author: author._id })
        await newBook.save()
        author.bookCount++
        await author.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
        return newBook
      } catch (exc) {
        throw new UserInputError('Book name is too short (minimum length is 2 characters)', {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.current) throw new AuthenticationError('you need log in to edit author')

      const author = await Author.findOne({ name: args.name })
      return Author.findByIdAndUpdate(author._id, { name: author.name, born: args.setBornTo })
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      return user.save().catch(error => {
        throw new UserInputError('Username is too short (minimum length is 3 characters) or favorite genre missing', {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') throw new UserInputError('wrong username or password')

      const userData = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userData, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers