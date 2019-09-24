import { graphql, GraphQLSchema } from 'graphql'
import { buildSchema, Maybe } from 'type-graphql'
import { AuthResolver } from '../modules/Authentication/AuthResolver'

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

const createSchema = () => buildSchema({
  resolvers: [AuthResolver]
})

let schema: GraphQLSchema

export const gqlCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await createSchema()
  }
  return graphql({
    schema,
    source,
    variableValues
  })
}
