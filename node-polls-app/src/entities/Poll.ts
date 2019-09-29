import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { User } from './User'
import { Field, ObjectType } from 'type-graphql'
import { PollOption } from './PollOption'

@ObjectType()
@Entity('polls')
class Poll extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column('timestamptz')
  createdAt: Date

  @Field()
  @Column('timestamptz', { nullable: true })
  ClosedAt: Date

  @Field()
  @Column({ default: true })
  open: boolean

  @Field()
  @Column({ default: true })
  moderated: boolean

  @ManyToOne(() => User, user => user.polls, { eager: false })
  user: User

  @Field(() => [PollOption])
  @OneToMany(() => PollOption, pollOption => pollOption.poll, { eager: true })
  pollOption: PollOption[]
}

export { Poll }
