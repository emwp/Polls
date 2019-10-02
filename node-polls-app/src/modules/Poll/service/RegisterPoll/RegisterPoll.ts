import { User } from "../../../../entities/User"
import { Poll } from "../../../../entities/Poll"

export const RegisterPoll = async (name: string, moderated: boolean, userId: string) : Promise<Poll> => {
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
}