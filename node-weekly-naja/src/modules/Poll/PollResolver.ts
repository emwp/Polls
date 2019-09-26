import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql'
import { Poll } from './../../entities/Poll'
import { isAuth } from '../Authentication/isAuth'
import { PollService } from './PollService'
import { MyContext } from './../../MyContext'

@Resolver()
export class PollResolver {
  @Mutation(() => Poll)
  @UseMiddleware(isAuth)
  async registerPoll (
    @Arg('name') name: string,
    @Arg('moderated') moderated: boolean,
    @Ctx() { payload } : MyContext
  ): Promise<Poll> {
    const userId = payload!.userId
    return PollService.registerPoll(name, moderated, userId)
  }
}
