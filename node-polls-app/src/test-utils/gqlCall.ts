import { graphql, GraphQLSchema } from 'graphql'
import { buildSchema, Maybe } from 'type-graphql'
import { AuthResolver } from '../modules/Authentication/AuthResolver'
import { PollResolver } from '../modules/Poll/PollResolver'

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  contextValue?: Maybe<{
    [key: string]: any
  }>,
}

const createSchema = () => buildSchema({
  resolvers: [AuthResolver, PollResolver]
})

let schema: GraphQLSchema

const gqlCall = async ({ source, variableValues, contextValue }: Options) => {
  if (!schema) {
    schema = await createSchema()
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue
  })
}

export { gqlCall }
