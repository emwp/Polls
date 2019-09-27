import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql'
import { isAuth } from '../Authentication/isAuth'
import { PollService } from './PollService'
import { MyContext } from './../../MyContext'
import { PollCreatedResponse } from './types'

@Resolver()
export class PollResolver {
  @Mutation(() => PollCreatedResponse)
  @UseMiddleware(isAuth)
  async registerPoll (
    @Arg('name') name: string,
    @Arg('moderated') moderated: boolean,
    @Ctx() { payload } : MyContext
  ): Promise<PollCreatedResponse> {
    const userId = payload!.userId
    return PollService.registerPoll(name, moderated, userId)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async removePoll (
    @Arg('id') id: string,
    @Ctx() { payload } : MyContext
  ): Promise<boolean> {
    const userId = payload!.userId
    return PollService.removePoll(id, userId)
  }
}
