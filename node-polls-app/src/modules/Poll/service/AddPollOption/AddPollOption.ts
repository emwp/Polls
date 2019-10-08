import { Poll } from '../../../../entities/Poll'
import { Option } from '../../../../entities/Option'

export const AddPollOption = async (userId: string, pollId: string, description: string) : Promise<Option> => {
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
}
