import { testConnection } from '../../../test-utils/testConnection'
import { gqlCall } from '../../../test-utils/gqlCall'
import { Connection } from 'typeorm'

let conn: Connection

beforeAll(async () => {
  conn = await testConnection()
})

afterAll(async () => {
  await conn.close()
})

const registerMutation = `
mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password)
}`

const loginMutation = `
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
  }
}
`

describe('register', () => {
  it('should succesfully signup the user', async () => {
    await gqlCall({
      source: registerMutation,
      variableValues: {
        email: 'test@test.com',
        password: '1234'
      }
    })

    const res2 = await gqlCall({
      source: loginMutation,
      variableValues: {
        email: 'test@test.com',
        password: '1234'
      }
    })
    // console.log(res2.data![0].login)
    console.log(res2.data!.login.accessToken)
  })
})
