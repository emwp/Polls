import { Poll } from "../../../../entities/Poll"

export const ClosePoll = async (id: string, userId: string) : Promise<Poll> => {
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
}