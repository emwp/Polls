import { hash } from 'bcryptjs'

import { User } from '../../../../entities/User'

export const Register = async (email: string, password: string) => {
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
