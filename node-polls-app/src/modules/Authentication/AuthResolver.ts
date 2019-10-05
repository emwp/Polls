import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { LoginResponse, RegisterInput } from './auth-utils/types'
import { AuthService } from './service'

@Resolver()
export class AuthResolver {
  @Query(() => String)
  hello () : string {
    return 'potato'
  }

  @Mutation(() => Boolean)
  async register (
    @Arg('registerInput') registerInput : RegisterInput
  ): Promise<boolean> {
    return AuthService.Register(registerInput.email, registerInput.password)
  }

  @Mutation(() => LoginResponse)
  async login (
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<LoginResponse> {
    return AuthService.Login(email, password)
  }
}
