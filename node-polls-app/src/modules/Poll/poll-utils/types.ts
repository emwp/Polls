import { InputType, Field } from 'type-graphql'
import { IsBoolean, MinLength } from 'class-validator'

@InputType()
class RegisterPollInput {
  @MinLength(6)
  @Field()
  name: string

  @IsBoolean()
  @Field()
  moderated: boolean
}

export { RegisterPollInput }
