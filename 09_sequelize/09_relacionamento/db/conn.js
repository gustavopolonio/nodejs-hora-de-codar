const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize