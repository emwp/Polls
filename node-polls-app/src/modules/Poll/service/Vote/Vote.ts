import { UserOption } from '../../../../entities/UserOption'
import { Option } from '../../../../entities/Option'

export const Vote = async (userId: string, pollId: string, optionId: number) : Promise<Option> => {
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

    return newOption
  }

  const option = await Option.findOneOrFail({ where: { id: optionId } })
  option.votes++

  UserOption.create({ optionId: optionId, userId: userId, pollId: pollId }).save()
  await option.save()
  return option
}
