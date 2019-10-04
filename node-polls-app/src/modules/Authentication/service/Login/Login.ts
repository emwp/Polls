import { compare } from 'bcryptjs'

import { User } from '../../../../entities/User'
import { createAccessToken } from '../../auth-utils/authToken'

export const Login = async (email: string, password: string) => {
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
