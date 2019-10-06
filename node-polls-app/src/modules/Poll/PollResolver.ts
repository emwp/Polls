import { Resolver, Mutation, Arg, UseMiddleware, Ctx, Query } from 'type-graphql'
import { isAuth } from '../Authentication/auth-utils/isAuth'
import { MyContext } from './../../MyContext'
import { Poll } from './../../entities/Poll'
import { Option } from '../../entities/Option'
import { PollService } from './service'
import { RegisterPollInput } from './poll-utils/types'

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
    @Arg('registerPollInput') registerPollInput : RegisterPollInput,
    @Ctx() { payload } : MyContext
  ): Promise<Poll> {
    const userId = payload!.userId
    return PollService.RegisterPoll(registerPollInput.name, registerPollInput.moderated, userId)
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
