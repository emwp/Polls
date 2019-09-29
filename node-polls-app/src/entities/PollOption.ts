import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm'
import { Poll } from './Poll'
import { ObjectType, Field } from 'type-graphql'

@ObjectType()
@Entity('options')
class PollOption extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  description: string

  @Field()
  @Column()
  votes: number

  @ManyToOne(() => Poll, poll => poll.pollOption, { eager: false })
  poll: Poll
}

export { PollOption }
