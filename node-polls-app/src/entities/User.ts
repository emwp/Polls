import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { Poll } from './Poll'
import { Option } from './Option'

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

  @Field(() => [Option])
  @ManyToMany(() => Option, option => option.voters, { nullable: true })
  options: Option[]
}

export { User }
