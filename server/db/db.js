const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://hylkosaejaqvvg:409b834d29bb9a12dace290616c3846e83c3c11d1d1eaae0ec6a04191c23ca8b@ec2-174-129-208-118.compute-1.amazonaws.com:5432/d89ucb5ftklbje`,
  {
    logging: false
  }
)
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
