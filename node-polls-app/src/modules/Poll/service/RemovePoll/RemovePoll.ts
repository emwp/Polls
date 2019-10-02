import { Poll } from "../../../../entities/Poll"

export const RemovePoll = async (id: string, userId: string) : Promise<boolean> => {
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
}