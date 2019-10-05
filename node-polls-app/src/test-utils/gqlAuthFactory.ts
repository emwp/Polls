import { gqlCall } from './gqlCall'

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

const Register = async (email: string, password: string) : Promise<boolean> => {
  const res = await gqlCall({
    source: registerMutation,
    variableValues: {
      email: email,
      password: password
    }
  })
  return res.data!.register
}

const Login = () => console.log(loginMutation)

export const gqlFactory = {
  Register,
  Login
}
