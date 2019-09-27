import { hash, compare } from 'bcryptjs'
import { User } from '../../entities/User'
import { createAccessToken } from './authToken'

const AuthService = {
  register: async (email: string, password: string) => {
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
  },

  login: async (email: string, password: string) => {
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
  },

  getUsers: async () => {
    const users = await User.find()
    return users
  }
}

export { AuthService }
