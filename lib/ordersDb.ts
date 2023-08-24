import mysql from 'serverless-mysql'

export const ordersDb = mysql({
  config: {
    host: process.env.MYSQL_HOST_MDB,
    database: process.env.MYSQL_DATABASE_MDB,
    user: process.env.MYSQL_USERNAME_MDB,
    password: process.env.MYSQL_PASSWORD_MDB,
    port: parseInt(<string>process.env.MYSQL_PORT_MDB, 10) || 3306,
  },
})

export async function query(
  q: string,
  values: (number | string)[] | string | number = []
) {
  try {
    const results = await ordersDb.query(q, values)
    await ordersDb.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}
