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
      poll.open = true
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
  }
}

export { PollService }
