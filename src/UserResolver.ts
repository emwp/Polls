import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql'
import { hash, compare } from 'bcryptjs'
import { User, UserResponse, LoginResponse } from './entity/User'
import { createAccessToken, createRefreshToken } from './auth'
import { MyContext } from './MyContext'

@Resolver()
export class UserResolver {
  @Query(() => String)
  async hello (): Promise<string> {
    return 'hello!'
  }

  @Query(() => String)
  async bye (): Promise<string> {
    return 'bye!'
  }

  @Query(() => [UserResponse])
  async users (): Promise<UserResponse[]> {
    const users = await User.find()
    return users
  }

  @Mutation(() => Boolean)
  async register (
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<boolean> {
    const hashedPassword = await hash(password, 10)
    const user = await User.findOne({ where: { email } })
    if (user) {
      return false
    }
    try {
      await User.insert({
        email,
        password: hashedPassword
      })
      return true
    } catch (err) {
      return false
    }
  }

  @Mutation(() => LoginResponse)
  async login (
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const valid = await compare(password, user.password)

    if (!valid) {
      throw new Error('Invalid credentials')
    }

    res.cookie(
      'jid',
      createRefreshToken(user),
      { httpOnly: true }
    )

    return {
      accessToken: createAccessToken(user)
    }
  }
}
