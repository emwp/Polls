import { Resolver, Mutation, Arg, UseMiddleware, Ctx, Query } from 'type-graphql'
import { isAuth } from '../Authentication/isAuth'
import { MyContext } from './../../MyContext'
import { Poll } from './../../entities/Poll'
import { Option } from '../../entities/Option'
import { PollService } from './service'

@Resolver()
class PollResolver {
  @Query(() => [Poll])
  @UseMiddleware(isAuth)
  async getUserPolls (
    @Ctx() { payload } : MyContext
  ) : Promise<Poll[]> {
    const userId = payload!.userId
    return PollService.GetUserPolls(userId)
  }

  @Mutation(() => Poll)
  @UseMiddleware(isAuth)
  async registerPoll (
    @Arg('name') name: string,
    @Arg('moderated') moderated: boolean,
    @Ctx() { payload } : MyContext
  ): Promise<Poll> {
    const userId = payload!.userId
    return PollService.RegisterPoll(name, moderated, userId)
  }

  @Mutation(() => Poll)
  @UseMiddleware(isAuth)
  async closePoll (
    @Arg('id') id: string,
    @Ctx() { payload } : MyContext
  ) : Promise<Poll> {
    const userId = payload!.userId
    return PollService.ClosePoll(id, userId)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async removePoll (
    @Arg('id') id: string,
    @Ctx() { payload } : MyContext
  ): Promise<boolean> {
    const userId = payload!.userId
    return PollService.RemovePoll(id, userId)
  }

  @Mutation(() => Option)
  @UseMiddleware(isAuth)
  async addPollOption (
    @Arg('pollId') pollId: string,
    @Arg('description') description: string,
    @Ctx() { payload } : MyContext
  ): Promise<Option> {
    const userId = payload!.userId
    return PollService.AddPollOption(userId, pollId, description)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote (
    @Arg('pollId') pollId: string,
    @Arg('optionId') optionId: number,
    @Ctx() { payload } : MyContext
  ): Promise<boolean> {
    const userId = payload!.userId
    return PollService.Vote(userId, pollId, optionId)
  }
}

export { PollResolver }
