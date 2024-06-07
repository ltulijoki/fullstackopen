import ReactDOM from 'react-dom/client'
import App from './App'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const auth = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-logged-user')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const http = new HttpLink({ uri: 'http://localhost:4000' })

const ws = new GraphQLWsLink(createClient({ url: 'ws://localhost:4000' }))

const splitL = split(({ query }) => {
  const def = getMainDefinition(query)
  return def.kind === 'OperationDefinition' && def.operation === 'subscription'
}, ws, auth.concat(http))

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitL
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)