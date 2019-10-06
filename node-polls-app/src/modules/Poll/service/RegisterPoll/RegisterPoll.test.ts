import { PollService } from './../'
import faker from 'faker'
import { Connection } from 'typeorm'

import { AuthTestFactory } from './../../../../test-utils/gqlAuthTestFactory/index'
import { testConnection } from '../../../../test-utils/testConnection'

let conn: Connection

beforeAll(async () => {
  conn = await testConnection()
})

afterAll(async () => {
  await conn.close()
})

describe('register poll', () => {
  const user = {
    email: faker.internet.email('potato'),
    password: faker.internet.password(8)
  }
  it('should throw error when the user responsible for the poll is not found', async () => {
    const poll = {
      name: faker.random.words(3),
      moderated: true,
      userId: faker.random.uuid()
    }

    try {
      await PollService.RegisterPoll(poll.name, poll.moderated, poll.userId)
    } catch (err) {
      expect(err.message).toBe('Unable to create poll')
    }
  })

  it('should succesfully create a new poll that is owned by a given user', async () => {
    await AuthTestFactory.Register(user.email, user.password)
    const login = await AuthTestFactory.Login(user.email, user.password)
    const { userId } = login.result

    const pollInfo = {
      name: 'will this test pass?',
      moderated: true,
      userId,
      date: new Date()
    }
    const today = pollInfo.date.toLocaleDateString('pt-BR')

    try {
      const poll = await PollService.RegisterPoll(pollInfo.name, pollInfo.moderated, pollInfo.userId)
      expect(poll).toBeDefined()
      expect(poll.name).toBe(pollInfo.name)
      expect(poll.moderated).toBe(pollInfo.moderated)
      expect(poll.user.id).toBe(pollInfo.userId)
      expect(poll.createdAt.toLocaleDateString('pt-BR')).toBe(today)
    } catch (error) {
      expect(error).toBeNull()
    }
  })
})
