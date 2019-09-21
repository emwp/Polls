import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema, Resolver, Query } from 'type-graphql'

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello () : Promise<string> {
    return 'Hello World!'
  }
}

async function main () : Promise<void> {
  const schema = await buildSchema({
    resolvers: [HelloResolver]
  })

  const apolloServer = new ApolloServer({ schema })

  const app = express()

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('Server started on http://localhost:4000/graphql')
  })
}

main()
