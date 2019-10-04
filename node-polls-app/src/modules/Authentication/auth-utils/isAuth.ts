import { MiddlewareFn } from 'type-graphql'
import { MyContext } from '../../../MyContext'
import { verify } from 'jsonwebtoken'

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers.authorization
  const accessSecret = process.env.ACCESS_TOKEN_SECRET

  if (!authorization) {
    throw new Error('Not Authenticated')
  }

  try {
    const token = authorization.split(' ')[1]
    const payload = verify(token, accessSecret!)
    context.payload = payload as any
  } catch (err) {
    throw new Error('Not Authenticated')
  }
  return next()
}
