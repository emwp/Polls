import { Entity, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm'
import { User } from './User'
import { Option } from './Option'

@Entity()
class UserOption extends BaseEntity {
  @PrimaryColumn()
  userId: string

  @PrimaryColumn()
  optionId: number

  @Column('uuid')
  pollId: string

  @ManyToOne(() => User, user => user.optionConnection, { primary: true })
  @JoinColumn({ name: 'userId' })
  user: User

  @ManyToOne(() => Option, option => option.userConnection, { primary: true })
  @JoinColumn({ name: 'optionId' })
  option: Option
}

export { UserOption }
