import { testConnection } from '../../../../test-utils/testConnection'
import { gqlFactory } from '../../../../test-utils/gqlAuthFactory'
import { Abramov } from '../../../../test-utils/mockUsers'
import { Connection } from 'typeorm'

let conn: Connection

beforeAll(async () => {
  conn = await testConnection()
})

afterAll(async () => {
  await conn.close()
})

describe('register', () => {
  it('should return true if user is registered succesfully', async () => {
    const register = await gqlFactory.Register(Abramov.email, Abramov.password)
    expect(register).toBe(true)
  })
})
