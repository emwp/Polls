import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { Poll } from './Poll'
import { User } from './User'

@ObjectType()
@Entity('options')
class Option extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  description: string

  @Field()
  @Column({ default: 0 })
  votes: number

  @Field(() => [User])
  @ManyToMany(() => User, user => user.options, { nullable: true })
  @JoinTable()
  voters: User[]

  @Field(() => Poll)
  @ManyToOne(() => Poll, poll => poll.options, { eager: false })
  poll: Poll
}

export { Option }
