import { User } from './../../entities/User'
import { Poll } from '../../entities/Poll'

const PollService = {
  registerPoll: async (name: string, moderated: boolean, userId: string) : Promise<Poll> => {
    try {
      const user = await User.findOneOrFail({ where: { id: userId } })

      const poll = new Poll()
      poll.name = name
      poll.moderated = moderated
      poll.user = user

      await poll.save()
      return poll
    } catch (err) {
      throw new Error(`Unable to create poll for user ${userId}`)
    }
  }
}

export { PollService }
