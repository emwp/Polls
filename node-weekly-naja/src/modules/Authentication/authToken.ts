import { User } from '../../entities/User'
import { sign } from 'jsonwebtoken'

export const createAccessToken = (user: User) => {
  const accessSecret = process.env.ACCESS_TOKEN_SECRET || 'supersecretsecret'
  return sign({ userId: user.id }, accessSecret, { expiresIn: '15m' })
}
