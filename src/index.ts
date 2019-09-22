import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './UserResolver'
import { createConnection } from 'typeorm'

async function main () : Promise<void> {
  await createConnection()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }) : {} => ({ req, res })
  })

  const app = express()

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('Server started on http://localhost:4000/graphql')
  })
}

main()
