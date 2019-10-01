import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { ObjectType, Field } from 'type-graphql'
import { Poll } from './Poll'
import { UserOption } from './UserOption'

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

  @OneToMany(() => UserOption, uo => uo.option)
  userConnection: UserOption[]

  @Field(() => Poll)
  @ManyToOne(() => Poll, poll => poll.options, { eager: false })
  poll: Poll
}

export { Option }
