import { gqlCall } from '../gqlCall'
import { decode } from 'jsonwebtoken'

const loginMutation = `
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
  }
}
`

export const Login = async (email: string, password: string) : Promise<any> => {
  const res = await gqlCall({
    source: loginMutation,
    variableValues: {
      email: email,
      password: password
    }
  })

  let result: { [key: string]: string } | null | string
  let error: string | null

  const hasError = res.errors

  if (hasError) {
    result = null
    error = res.errors![0].message
    return { result, error }
  }

  result = decode(res.data!.login.accessToken)
  error = null

  return { result, error }
}
