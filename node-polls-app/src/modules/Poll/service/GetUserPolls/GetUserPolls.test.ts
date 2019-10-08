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

describe('get user polls', () => {
  it('should not return any polls if the user (userId) doesn\'t exist in the db', async () => {
    try {
      const polls = await PollService.GetUserPolls(faker.random.uuid())
      expect(polls).toBeEmpty()
    } catch (error) {
      expect(error).toBeNull()
    }
  })

  it('should not return any polls when the user does not have polls', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(8)
    }
    await AuthTestFactory.Register(user.email, user.password)
    const login = await AuthTestFactory.Login(user.email, user.password)
    const { userId } = login.result

    try {
      const polls = await PollService.GetUserPolls(userId)
      expect(polls).toBeEmpty()
    } catch (error) {
      expect(error).toBeNull()
    }
  })

  it('should only fetch polls for a given users', async () => {
    const user = {
      email: faker.internet.email('bill'),
      password: faker.internet.password(8)
    }

    const otherUserInfo = {
      email: faker.internet.email('other-user'),
      password: faker.internet.password(8)
    }
    await AuthTestFactory.Register(otherUserInfo.email, otherUserInfo.password)
    const otherUser = await AuthTestFactory.Login(otherUserInfo.email, otherUserInfo.password)
    await PollService.RegisterPoll(faker.hacker.phrase(), true, otherUser.result.userId)

    await AuthTestFactory.Register(user.email, user.password)
    const currentUser = await AuthTestFactory.Login(user.email, user.password)

    const { userId } = currentUser.result

    try {
      const poll1 = await PollService.RegisterPoll('avocado', true, userId)
      const poll2 = await PollService.RegisterPoll('zebra', false, userId)
      expect(poll1).toBeDefined()
      expect(poll2).toBeDefined()

      const userPolls = await PollService.GetUserPolls(userId)
      expect(userPolls).toHaveLength(2)
      expect(userPolls[0].name).toBe(poll1.name)
      expect(userPolls[1].name).toBe(poll2.name)
    } catch (error) {
      expect(error).toBeNull()
    }
  })
})
