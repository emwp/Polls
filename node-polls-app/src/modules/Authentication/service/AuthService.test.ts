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
}`

describe('register', () => {
  it('should succesfully signup the user', async () => {
    const res1 = await gqlCall({
      source: registerMutation,
      variableValues: {
        email: 'testtest@test.com',
        password: '123456'
      }
    })

    console.log(res1)

    const res2 = await gqlCall({
      source: loginMutation,
      variableValues: {
        email: 'testtest@test.com',
        password: '123456'
      }
    })
    // console.log(res2.data![0].login)
    console.log(res2)
    console.log(process.env.NODE_ENV)
    console.log(process.env.NODE_ENV)
  })
})
