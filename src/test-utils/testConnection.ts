import { createConnection } from 'typeorm'

export const testConnection = (drop = false) => {
  return createConnection({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'weeklynaja-test',
    synchronize: drop,
    dropSchema: drop,
    // eslint-disable-next-line no-path-concat
    entities: [__dirname + '/../entities/*.*']
  })
}
