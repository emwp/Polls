import { Connection } from 'typeorm'
import faker from 'faker'

import { AuthTestFactory } from './../../../../test-utils/gqlAuthTestFactory/index'
import { testConnection } from '../../../../test-utils/testConnection'
import { PollService } from './../'

let conn: Connection

beforeAll(async () => {
  conn = await testConnection()
})

afterAll(async () => {
  await conn.close()
})

describe('close poll', () => {
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
      await PollService.ClosePoll(poll.id, poll.user.userId)
    } catch (error) {
      expect(error.message).toInclude('EntityNotFound: Could not find any entity of type "Poll"')
    }
  })

  it('should throw error when the user is not the poll owner', async () => {
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
      await PollService.ClosePoll(poll.id, faker.random.uuid())
    } catch (error) {
      expect(error.message).toInclude('EntityNotFound: Could not find any entity of type "Poll"')
    }
  })

  it('should succesfully close a poll', async () => {
    await AuthTestFactory.Register(user.email, user.password)
    const login = await AuthTestFactory.Login(user.email, user.password)
    const { userId } = login.result

    const pollInfo = {
      name: 'will this poll be closed?',
      moderated: false,
      userId,
      date: new Date()
    }
    const today = pollInfo.date.toLocaleDateString('pt-BR')

    try {
      const poll = await PollService.RegisterPoll(pollInfo.name, pollInfo.moderated, pollInfo.userId)
      expect(poll).toBeDefined()
      expect(poll.open).toBe(true)

      const closedPoll = await PollService.ClosePoll(poll.id, poll.user.id)
      expect(closedPoll.open).toBe(false)
      expect(closedPoll.ClosedAt.toLocaleDateString('pt-BR')).toBe(today)
    } catch (error) {
      expect(error).toBeNull()
    }
  })
})
