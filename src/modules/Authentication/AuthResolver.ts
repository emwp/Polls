import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql'
import { UserResponse, LoginResponse } from '../../entities/types'
import { isAuth } from './isAuth'
import { AuthService } from './AuthService'

@Resolver()
export class AuthResolver {
  @Query(() => [UserResponse])
  @UseMiddleware(isAuth)
  async users (): Promise<UserResponse[]> {
    return AuthService.getUsers()
  }

  @Mutation(() => Boolean)
  async register (
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<boolean> {
    return AuthService.register(email, password)
  }

  @Mutation(() => LoginResponse)
  async login (
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<LoginResponse> {
    return AuthService.login(email, password)
  }
}
