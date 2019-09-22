import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql'
import { User, UserResponse, LoginResponse } from './entity/User'
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { MyContext } from './MyContext'

@Resolver()
export class UserResolver {
  @Query(() => String)
  async hello (): Promise<string> {
    return 'Potato!'
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
      sign({ userId: user.id }, 'superrefreshsecret', { expiresIn: '7d' }),
      { httpOnly: true }
    )

    return {
      accessToken: sign({ userId: user.id }, 'supersecretsecret', { expiresIn: '15m' })
    }
  }
}
