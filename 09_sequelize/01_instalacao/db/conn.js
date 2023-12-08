const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('Connection established')
} catch (e) {
  console.log('Unable to connect to the database: ', e)
}

module.exports = sequelize