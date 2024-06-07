require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(MONGODB_URI)

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsServer = new WebSocketServer({ server: httpServer, path: '/' })
  const cleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decoded = jwt.verify(auth.substring(7), JWT_SECRET)
        const current = await User.findById(decoded.id)
        return { current }
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      { async serverWillStart() { return { async drainServer() { await cleanup.dispose() } } } }
    ]
  })

  await server.start()
  server.applyMiddleware({ app, path: '/' })

  const PORT = 4000
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
  })
}

start()