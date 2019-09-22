import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  email: string

  @Column()
  password: string
}

@ObjectType()
export class UserResponse {
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

export { LoginResponse }
