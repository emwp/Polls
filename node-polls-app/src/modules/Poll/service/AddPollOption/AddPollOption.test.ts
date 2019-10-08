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

describe('add poll option', () => {
  it('should throw error if cant find the belonging poll/user to add voting option', async () => {
    try {
      await PollService.AddPollOption(faker.random.uuid(), faker.random.uuid(), faker.random.words(3))
    } catch (error) {
      expect(error.message).toInclude('EntityNotFound: Could not find any entity of type "Poll"')
    }
  })

  it('should throw error when trying to add voting option to an already closed poll', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(8)
    }
    try {
      await AuthTestFactory.Register(user.email, user.password)
      const currentUser = await AuthTestFactory.Login(user.email, user.password)
      const { userId } = currentUser.result

      const poll = await PollService.RegisterPoll(faker.random.words(2), true, userId)
      const closedPoll = await PollService.ClosePoll(poll.id, userId)

      await PollService.AddPollOption(userId, closedPoll.id, faker.random.words(3))
    } catch (error) {
      expect(error.message).toInclude('Unable to add options to closed polls')
    }
  })

  it('should add an voting option to a poll', async () => {
    const user = {
      email: faker.internet.email('steve'),
      password: faker.internet.password(8)
    }

    await AuthTestFactory.Register(user.email, user.password)
    const currentUser = await AuthTestFactory.Login(user.email, user.password)

    const { userId } = currentUser.result

    try {
      const poll = await PollService.RegisterPoll(faker.random.words(3), false, userId)
      expect(poll).toBeDefined()
      expect(poll.options).toBeNil()

      const newOption = await PollService.AddPollOption(userId, poll.id, faker.random.words(3))

      expect(newOption).toBeDefined()
      expect(newOption.poll.id).toBe(poll.id)
    } catch (error) {
      expect(error).toBeNull()
    }
  })
})
