import 'reflect-metadata'
import { ObjectType, Field, InputType } from 'type-graphql'
import { MinLength, IsEmail } from 'class-validator'

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string
}

@InputType()
class RegisterInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @MinLength(6)
  password: string
}

export { LoginResponse, RegisterInput }
