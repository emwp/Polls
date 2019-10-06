import faker from 'faker'
import { Connection } from 'typeorm'

import { AuthTestFactory } from '../../../../test-utils/gqlAuthTestFactory'
import { testConnection } from '../../../../test-utils/testConnection'

let conn: Connection

beforeAll(async () => {
  conn = await testConnection()
})

afterAll(async () => {
  await conn.close()
})

describe('login', () => {
  it('should succesfully login the user', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(8)
    }

    await AuthTestFactory.Register(user.email, user.password)

    const login = await AuthTestFactory.Login(user.email, user.password)
    expect(login.result.email).toBe(user.email)
  })

  it('should throw invalid credentials error when trying to login with invalid email, password or both', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(8)
    }

    await AuthTestFactory.Register(user.email, user.password)

    const successfulLogin = await AuthTestFactory.Login(user.email, user.password)
    expect(successfulLogin.error).toBe(null)

    const wrongPassword = await AuthTestFactory.Login(user.email, '777888')
    expect(wrongPassword.error).toBe('Invalid credentials')

    const wrongEmail = await AuthTestFactory.Login(faker.internet.email(), user.email)
    expect(wrongEmail.error).toBe('Invalid credentials')

    const wrongEmailAndPassword = await AuthTestFactory.Login(faker.internet.email(), faker.internet.password(6))
    expect(wrongEmailAndPassword.error).toBe('Invalid credentials')
  })
})
