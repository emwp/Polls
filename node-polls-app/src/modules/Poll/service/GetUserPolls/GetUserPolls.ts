import { Poll } from '../../../../entities/Poll'

export const GetUserPolls = async (userId: string) : Promise<Poll[]> => {
  const polls = await Poll.find({ where: { user: userId }, order: { name: 'ASC' } })
  return polls
}
