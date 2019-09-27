import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm'
import { Poll } from './Poll'

@Entity('options')
export class PollOption extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  description: string

  @Column()
  votes: number

  @ManyToOne(() => Poll, poll => poll.pollOption, { eager: false })
  poll: Poll
}
