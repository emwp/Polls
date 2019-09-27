import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class PollCreatedResponse {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  moderated: boolean

  @Field()
  userId: string
}

export { PollCreatedResponse }
