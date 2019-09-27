import { ObjectType, Field } from 'type-graphql'

@ObjectType()
class UserResponse {
  @Field()
  id: string

  @Field()
  email: string
}

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
}

export { UserResponse, LoginResponse }
