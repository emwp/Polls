import { gqlCall } from '../gqlCall'

const registerMutation = `
mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password)
}
`

const loginMutation = `
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
  }
}
`

export const register = async () => {
  await gqlCall({
    source: registerMutation,
    variableValues: {
      email: 'test@test.com',
      password: '1234'
    }
  })
}
export const login = async () => {
  const res2 = await gqlCall({
    source: loginMutation,
    variableValues: {
      email: 'test@test.com',
      password: '1234'
    }
  })

  return res2
}
