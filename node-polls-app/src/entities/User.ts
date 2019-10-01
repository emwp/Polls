import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { Poll } from './Poll'
import { UserOption } from './UserOption'

@ObjectType()
@Entity('users')
class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  email: string

  @Field()
  @Column()
  password: string

  @Field(() => [Poll])
  @OneToMany(() => Poll, poll => poll.user, { eager: true })
  polls: Poll[]

  @OneToMany(() => UserOption, uo => uo.user)
  optionConnection: UserOption[]
}

export { User }
