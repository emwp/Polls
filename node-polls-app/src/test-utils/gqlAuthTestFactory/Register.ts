import { gqlCall } from '../gqlCall'

const registerMutation = `
mutation Register($email: String!, $password: String!) {
  register(registerInput: {email: $email, password: $password})
}
`

interface RegisterResponse {
  result: boolean,
  error: string | null
}

export const Register = async (email: string, password: string) : Promise<RegisterResponse> => {
  const res = await gqlCall({
    source: registerMutation,
    variableValues: {
      email: email,
      password: password
    }
  })

  let result: boolean
  let error: string | null

  const hasError = res.errors

  if (hasError) {
    result = false
    error = res.errors![0].message
    return { result, error }
  }

  result = res.data!.register
  error = null

  return { result, error }
}
