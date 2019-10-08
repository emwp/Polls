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

describe('vote', () => {
  it('should throw error if already voted in the same option', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(8)
    }
    try {
      await AuthTestFactory.Register(user.email, user.password)
      const login = await AuthTestFactory.Login(user.email, user.password)
      const { userId } = login.result

      const poll = await PollService.RegisterPoll(faker.random.words(3), true, userId)
      const option = await PollService.AddPollOption(userId, poll.id, faker.random.words(2))
      expect(option.votes).toBe(0)

      const vote = await PollService.Vote(userId, poll.id, option.id)
      expect(vote.votes).toBe(1)

      await PollService.Vote(userId, poll.id, option.id)
    } catch (error) {
      expect(error.message).toInclude('Already voted in this poll option')
    }
  })

  it('should be able to change the voted poll option', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(8)
    }
    try {
      await AuthTestFactory.Register(user.email, user.password)
      const login = await AuthTestFactory.Login(user.email, user.password)
      const { userId } = login.result

      const poll = await PollService.RegisterPoll(faker.random.words(3), true, userId)
      const option1 = await PollService.AddPollOption(userId, poll.id, 'Poll option one')
      const option2 = await PollService.AddPollOption(userId, poll.id, 'Poll option two')
      expect(option1.votes).toBe(0)
      expect(option2.votes).toBe(0)

      const votedOption1 = await PollService.Vote(userId, poll.id, option1.id)
      expect(votedOption1.votes).toBe(1)
      const votedOption2 = await PollService.Vote(userId, poll.id, option2.id)
      expect(votedOption2.votes).toBe(1)

      const userPoll = await PollService.GetUserPolls(userId)

      expect(userPoll[0].options[0].votes).toBe(0)
      expect(userPoll[0].options[1].votes).toBe(1)
    } catch (error) {
      expect(error).toBeNull()
    }
  })

  it('should succesfully vote on a poll option', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(8)
    }
    try {
      await AuthTestFactory.Register(user.email, user.password)
      const login = await AuthTestFactory.Login(user.email, user.password)
      const { userId } = login.result

      const poll = await PollService.RegisterPoll(faker.random.words(3), true, userId)
      expect(poll).toBeDefined()
      const option = await PollService.AddPollOption(userId, poll.id, faker.random.words(2))
      expect(option).toBeDefined()
      expect(option.votes).toBe(0)

      const vote = await PollService.Vote(userId, poll.id, option.id)
      expect(vote.votes).toBe(1)
    } catch (error) {
      expect(error).toBeNull()
    }
  })
})
