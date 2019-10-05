import { User } from '../../../entities/User'
import { sign } from 'jsonwebtoken'

export const createAccessToken = (user: User) => {
  const accessSecret = process.env.ACCESS_TOKEN_SECRET || 'verysecretaccesssecret'
  const payload = {
    userId: user.id,
    email: user.email
  }
  return sign(payload, accessSecret!, { expiresIn: '30d' })
}
