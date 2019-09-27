import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { User } from './User'
import { PollOption } from './PollOption'

@Entity('polls')
export class Poll extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ default: true })
  moderated: boolean

  @ManyToOne(() => User, user => user.polls, { eager: false })
  user: User

  @OneToMany(() => PollOption, pollOption => pollOption.poll, { eager: true })
  pollOption: PollOption[]
}
