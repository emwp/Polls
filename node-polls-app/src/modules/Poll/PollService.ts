import { User } from './../../entities/User'
import { Poll } from '../../entities/Poll'
import { PollCreatedResponse } from './types'

const PollService = {
  registerPoll: async (name: string, moderated: boolean, userId: string) : Promise<PollCreatedResponse> => {
    try {
      const user = await User.findOneOrFail({ where: { id: userId } })
      user.password = ''

      const poll = new Poll()
      poll.name = name
      poll.moderated = moderated
      poll.user = user
      poll.createdAt = new Date()

      const persistedPoll = await poll.save()

      return {
        id: persistedPoll.id,
        name,
        moderated,
        open: poll.open,
        userId
      }
    } catch (err) {
      throw new Error('Unable to create poll')
    }
  },

  closePoll: async (id: string, userId: string) : Promise<Poll> => {
    try {
      const poll = await Poll.findOneOrFail({ where: { id: id, user: userId } })
      poll.open = false
      poll.ClosedAt = new Date()

      await poll.save()
      return poll
    } catch (error) {
      throw new Error('Unable to close poll')
    }
  },

  removePoll: async (id: string, userId: string) : Promise<boolean> => {
    try {
      const poll = await Poll.findOneOrFail({
        where:
          { id: id, user: userId }
      })
      await poll.remove()
      return true
    } catch (error) {
      throw new Error('Pool not found for current user')
    }
  },

  getUserPolls: async (userId: string) : Promise<Poll[]> => {
    try {
      const polls = await Poll.find({ where: { user: userId }, order: { name: 'ASC' } })
      console.log(polls)
      return polls
    } catch (error) {
      throw new Error('Unable to retrieve user polls')
    }
  }
}

export { PollService }
