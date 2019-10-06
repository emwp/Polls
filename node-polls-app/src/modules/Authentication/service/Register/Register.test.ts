import { testConnection } from '../../../../test-utils/testConnection'
import { AuthTestFactory } from '../../../../test-utils/gqlAuthTestFactory'
import faker from 'faker'
import { Connection } from 'typeorm'

let conn: Connection

beforeAll(async () => {
  conn = await testConnection()
})

afterAll(async () => {
  await conn.close()
})

describe('register', () => {
  const user1 = {
    email: faker.internet.email(),
    password: faker.internet.password(8)
  }

  const user2 = {
    email: faker.internet.email(),
    password: faker.internet.password(8)
  }

  it('should return true if user is registered succesfully', async () => {
    const register = await AuthTestFactory.Register(user1.email, user1.password)
    expect(register.result).toBe(true)
  })

  it('should return false when trying to register with an email that is already in use', async () => {
    const register = await AuthTestFactory.Register(user1.email, user1.password)
    expect(register.result).toBe(false)
  })

  it('should return false when the password length is less than 6 characteres', async () => {
    const register = await AuthTestFactory.Register(user2.email, '12345')
    expect(register.error).toBe('Argument Validation Error')
  })

  it('should return false when the input field for email is not valid', async () => {
    const register = await AuthTestFactory.Register(faker.internet.userName(), user2.password)
    expect(register.error).toBe('Argument Validation Error')
  })
})
