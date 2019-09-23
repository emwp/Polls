import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql'
import { hash, compare } from 'bcryptjs'
import { MyContext } from '../../MyContext'
import { User } from '../../entities/User'
import { UserResponse, LoginResponse } from '../../entities/types'
import { isAuth } from './isAuth'
import { createAccessToken } from './authToken'

@Resolver()
export class AuthResolver {
  @Query(() => [UserResponse])
  @UseMiddleware(isAuth)
  async users (@Ctx() { payload }: MyContext): Promise<UserResponse[]> {
    console.log(payload)
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
    @Arg('password') password: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const valid = await compare(password, user.password)

    if (!valid) {
      throw new Error('Invalid credentials')
    }

    return {
      accessToken: createAccessToken(user)
    }
  }
}
