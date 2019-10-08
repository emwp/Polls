import { Poll } from '../../../../entities/Poll'

export const GetUserPolls = async (userId: string) : Promise<Poll[]> => {
  try {
    const polls = await Poll.find({ where: { user: userId }, order: { name: 'ASC' } })
    return polls
  } catch (_) {
    throw new Error('Unable to retrieve user polls')
  }
}
