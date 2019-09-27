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

      const persistedPoll = await poll.save()

      return {
        id: persistedPoll.id,
        name,
        moderated,
        userId
      }
    } catch (err) {
      throw new Error(`Unable to create poll for user ${userId}`)
    }
  }
}

export { PollService }
