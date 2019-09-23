import 'dotenv/config'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import cors from 'cors'
import { AuthResolver } from './modules/Authentication/AuthResolver'

async function main () : Promise<void> {
  const app = express()

  app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

  await createConnection()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver]
    }),
    context: ({ req, res }) : {} => ({ req, res })
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(4000, () => {
    console.log('Server started on http://localhost:4000/graphql')
  })
}

main()
