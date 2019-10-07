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

describe('remove poll', () => {
  const user = {
    email: faker.internet.email('batata'),
    password: faker.internet.password(8)
  }

  it('should throw error when the poll is not found', async () => {
    const poll = {
      id: faker.random.uuid(),
      name: faker.random.words(3),
      moderated: true,
      user: { userId: faker.random.uuid() }
    }

    try {
      await PollService.RemovePoll(poll.id, poll.user.userId)
    } catch (err) {
      expect(err.message).toBe('Pool not found for current user')
    }
  })

  it('should throw error when the user is not the polls owner', async () => {
    await AuthTestFactory.Register(user.email, user.password)
    const login = await AuthTestFactory.Login(user.email, user.password)
    const { userId } = login.result

    const pollInfo = {
      name: faker.random.words(3),
      moderated: true,
      user: { userId }
    }

    const poll = await PollService.RegisterPoll(pollInfo.name, pollInfo.moderated, pollInfo.user.userId)

    try {
      await PollService.RemovePoll(poll.id, faker.random.uuid())
    } catch (err) {
      expect(err.message).toBe('Pool not found for current user')
    }
  })

  it('should succesfully remove a poll', async () => {
    await AuthTestFactory.Register(user.email, user.password)
    const login = await AuthTestFactory.Login(user.email, user.password)
    const { userId } = login.result

    const pollInfo = {
      name: 'will this poll be remove?',
      moderated: false,
      userId,
      date: new Date()
    }

    try {
      const poll = await PollService.RegisterPoll(pollInfo.name, pollInfo.moderated, pollInfo.userId)
      expect(poll).toBeDefined()

      const removedPoll = await PollService.RemovePoll(poll.id, userId)
      expect(removedPoll).toBe(true)
    } catch (error) {
      expect(error).toBeNull()
    }
  })
})
