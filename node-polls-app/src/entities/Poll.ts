import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { User } from './User'
import { PollOption } from './PollOption'

@ObjectType()
@Entity('polls')
export class Poll extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column({ default: true })
  moderated: boolean

  @ManyToOne(() => User, user => user.polls, { eager: false })
  user: User

  @OneToMany(() => PollOption, pollOption => pollOption.poll, { eager: true })
  pollOption: PollOption[]
}
