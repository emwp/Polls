import { Resolver, Mutation, Arg } from 'type-graphql'
import { LoginResponse } from './auth-utils/types'
import { AuthService } from './service/index'

@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean)
  async register (
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<boolean> {
    return AuthService.Register(email, password)
  }

  @Mutation(() => LoginResponse)
  async login (
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<LoginResponse> {
    return AuthService.Login(email, password)
  }
}
