import { User } from './../../entities/User'
import { Poll } from '../../entities/Poll'
import { Option } from '../../entities/Option'
import { UserOption } from '../../entities/UserOption'

const PollService = {
  registerPoll: async (name: string, moderated: boolean, userId: string) : Promise<Poll> => {
    try {
      const user = await User.findOneOrFail({ where: { id: userId } })
      user.password = ''

      const poll = Poll.create({ 
        name: name, 
        moderated: moderated, 
        user: user, 
        createdAt: new Date()
      })

      await poll.save()

      return poll
    } catch (_) {
      throw new Error('Unable to create poll')
    }
  },

  closePoll: async (id: string, userId: string) : Promise<Poll> => {
    try {
      const poll = await Poll.findOneOrFail({ where: { id: id, user: userId } })
      const isClosed = poll.ClosedAt && !poll.open

      if (isClosed) {
        throw new Error('Unable to close. This poll is already closed')
      }

      poll.open = false
      poll.ClosedAt = new Date()

      await poll.save()
      return poll
    } catch (error) {
      console.log(error)
      throw new Error(error)
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
    } catch (_) {
      throw new Error('Pool not found for current user')
    }
  },

  getUserPolls: async (userId: string) : Promise<Poll[]> => {
    try {
      const polls = await Poll.find({ where: { user: userId }, order: { name: 'ASC' } })
      return polls
    } catch (_) {
      throw new Error('Unable to retrieve user polls')
    }
  },

  addPollOption: async (userId: string, pollId: string, description: string) : Promise<Option> => {
    try {
      const poll = await Poll.findOneOrFail({ where: { id: pollId, user: userId } })

      if (!poll.open) {
        throw new Error('Unable to add options to closed polls')
      }
      
      const newOption = Option.create({
        poll: poll,
        description: description
      })

      await newOption.save()

      return newOption
    } catch (error) {
      throw new Error(error)
    }
  },

  vote: async (userId: string, pollId: string, optionId: number) : Promise<boolean> => {
    /*
      TODO: REFACTOR THIS SHIT
    */
    const votedOnPoll = await UserOption.findOne({ where: { pollId: pollId, userId: userId } })
    const votedOption = votedOnPoll! && votedOnPoll!.optionId === optionId

    if (votedOnPoll && votedOption) {
      throw new Error('Already voted in this poll option')
    }

    if (votedOnPoll && !votedOption) {
      const previousOptionId = votedOnPoll!.optionId
      const previousOption = await Option.findOneOrFail({ where: { id: previousOptionId } })
      previousOption.votes--

      const newOption = await Option.findOneOrFail({ where: { id: optionId } })
      newOption.votes++

      await UserOption.update(votedOnPoll, { optionId: optionId })
      await previousOption.save()
      await newOption.save()

      return true
    }

    const option = await Option.findOneOrFail({ where: { id: optionId } })
    option.votes++

    UserOption.create({ optionId: optionId, userId: userId, pollId: pollId }).save()
    await option.save()
    return true
  }
}

export { PollService }
