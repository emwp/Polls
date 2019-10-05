import { compare } from 'bcryptjs'

import { createAccessToken } from '../../auth-utils/authToken'
import { LoginResponse } from '../../auth-utils/types'
import { User } from '../../../../entities/User'

export const Login = async (email: string, password: string) : Promise<LoginResponse> => {
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
